import sys
import os
import cv2
import easyocr
from rapidfuzz import process, fuzz

# ---------- FORCE UTF-8 (WINDOWS FIX) ----------
sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

# ---------- PATHS ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DICT_PATH = os.path.join(BASE_DIR, "bn_words.txt")

# ---------- LOAD DICTIONARY ----------
BN_WORDS = []
if os.path.exists(DICT_PATH):
    with open(DICT_PATH, "r", encoding="utf-8") as f:
        BN_WORDS = [w.strip() for w in f if len(w.strip()) > 1]

# ---------- LOAD OCR MODELS (ONCE) ----------
bn_reader = easyocr.Reader(
    ['bn'],
    gpu=False,
    verbose=False
)

en_reader = easyocr.Reader(
    ['en'],
    gpu=False,
    verbose=False
)

# ---------- SPELL CORRECTION ----------
def correct_word(word, threshold=80):
    if not BN_WORDS or word in BN_WORDS:
        return word
    match = process.extractOne(word, BN_WORDS, scorer=fuzz.ratio)
    if match and match[1] >= threshold:
        return match[0]
    return word

def correct_text(text):
    lines = []
    for line in text.split("\n"):
        words = [correct_word(w) for w in line.split()]
        lines.append(" ".join(words))
    return "\n".join(lines)

# ---------- MAIN ----------
def main():
    if len(sys.argv) < 2:
        sys.exit(1)

    image_path = sys.argv[1]

    if not os.path.exists(image_path):
        sys.exit(1)

    img = cv2.imread(image_path)
    if img is None:
        sys.exit(1)

    # ---------- SAFE IMAGE RESIZE ----------
    h, w = img.shape[:2]
    max_dim = 1600
    if max(h, w) > max_dim:
        scale = max_dim / max(h, w)
        img = cv2.resize(
            img, None,
            fx=scale, fy=scale,
            interpolation=cv2.INTER_AREA
        )

    # ---------- PREPROCESS (OCR FRIENDLY) ----------
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # IMPORTANT: NO THRESHOLDING (breaks Bengali matra)
    gray = cv2.fastNlMeansDenoising(gray, h=15)

    # ---------- OCR PASS 1: BENGALI ----------
    bn_results = bn_reader.readtext(
        gray,
        detail=0,
        paragraph=True,
        batch_size=1,
        canvas_size=1024,
        mag_ratio=1.0,
        low_text=0.4,
        text_threshold=0.6,
        link_threshold=0.4
    )
    bn_text = "\n".join(bn_results)

    # ---------- OCR PASS 2: ENGLISH ----------
    en_results = en_reader.readtext(
        gray,
        detail=0,
        paragraph=True,
        batch_size=1,
        canvas_size=1024,
        mag_ratio=1.0
    )
    en_text = "\n".join(en_results)

    # ---------- PICK BETTER RESULT ----------
    final_text = bn_text if len(bn_text.strip()) > len(en_text.strip()) else en_text

    # ---------- SPELL CORRECTION (BN ONLY) ----------
    final_text = correct_text(final_text)

    # ---------- OUTPUT ----------
    print(final_text.strip())

# ---------- ENTRY ----------
if __name__ == "__main__":
    main()