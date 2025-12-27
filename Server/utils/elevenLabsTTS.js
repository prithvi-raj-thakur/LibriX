import fs from "fs";
import path from "path";

const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const generateSpeech = async (text, outputPath) => {
  const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVEN_API_KEY) {
    throw new Error("ElevenLabs API Key is missing");
  }

  if (!text) {
    throw new Error("Text is required for TTS");
  }

  if (!outputPath) {
    throw new Error("Output path is missing");
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.6,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ ElevenLabs API Error:", errorText);
    throw new Error(`ElevenLabs failed: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  return outputPath;
};
