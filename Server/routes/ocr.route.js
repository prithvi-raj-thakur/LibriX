import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { generateSpeech } from '../utils/elevenLabsTTS.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/temp/' });

const tempDir = path.resolve('uploads/temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

router.post('/process', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        // 1️⃣ Upload image to Cloudinary
        const cloudImage = await cloudinary.uploader.upload(req.file.path, {
            folder: 'book_descriptions'
        });

        // 2️⃣ Run Python OCR
        const scriptPath = path.join(process.cwd(), 'ocr_feature', 'ocr.py');
        const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

        const pythonProcess = spawn(pythonCmd, [scriptPath, req.file.path]);

        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', d => output += d.toString());
        pythonProcess.stderr.on('data', d => errorOutput += d.toString());

        pythonProcess.on('close', async code => {
            fs.unlink(req.file.path, () => {});

            if (code !== 0) {
                return res.status(500).json({ error: errorOutput });
            }

            const extractedText = output.trim();

            try {
                // 3️⃣ Generate MP3 using ElevenLabs
                const audioPath = path.join(tempDir, `desc-${Date.now()}.mp3`);
                await generateSpeech(extractedText, audioPath);

                // 4️⃣ Upload MP3 to Cloudinary
                const cloudAudio = await cloudinary.uploader.upload(audioPath, {
                    resource_type: "video",
                    folder: "book_audio_descriptions"
                });

                fs.unlink(audioPath, () => {});

                // 5️⃣ Return everything
                res.json({
                    extractedText,
                    imageUrl: cloudImage.secure_url,
                    audioUrl: cloudAudio.secure_url
                });

            } catch (ttsError) {
                console.error("TTS ERROR:", ttsError.message);
                return res.status(500).json({
                    error: "Audio generation failed"
                });
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
