#!/usr/bin/env python3
"""
Format images to Microsoft commercial marketplace (Partner Center) media specs.

Marketplace requirements enforced here:
  Logos       square PNG, 216x216 - 350x350 (large). Also emits medium 90x90
              and small 48x48 so you can override Partner Center's auto-resize.
  Screenshots exactly 1280x720 PNG.

Usage
  python3 scripts/marketplace-media.py --logo logo.png --outdir out/
  python3 scripts/marketplace-media.py --screenshot shot1.png shot2.png --outdir out/
  python3 scripts/marketplace-media.py --screenshot *.png --mode crop --gravity top --outdir out/

Screenshot modes (sources are almost never exactly 16:9):
  fit   (default) scale to fit inside 1280x720 and pad the remainder. Nothing is
        cut and nothing is stretched. Pad colour is sampled from the source
        corners unless --pad is given.
  crop  scale to fill 1280x720 and crop the overflow. Nothing is stretched but
        content is cut; choose which part survives with --gravity.

Requires Pillow:  python3 -m pip install pillow
"""

import argparse
import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required. Install it with: python3 -m pip install pillow")

SHOT_W, SHOT_H = 1280, 720
LOGO_MIN, LOGO_MAX = 216, 350
LOGO_DEFAULT = 280
LOGO_MEDIUM, LOGO_SMALL = 90, 48


def sample_pad_colour(img):
    """Average the four corner pixels so padding blends into the screenshot."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    pixels = [rgb.getpixel(c) for c in corners]
    return tuple(sum(channel) // len(pixels) for channel in zip(*pixels))


def parse_colour(text):
    text = text.strip().lstrip("#")
    if len(text) == 3:
        text = "".join(c * 2 for c in text)
    if len(text) != 6:
        raise argparse.ArgumentTypeError(f"expected a hex colour like #0b0b12, got {text!r}")
    return tuple(int(text[i:i + 2], 16) for i in (0, 2, 4))


def crop_box(src_w, src_h, target_ratio, gravity):
    """Largest box of target_ratio that fits in the source, placed per gravity."""
    if src_w / src_h > target_ratio:
        box_w, box_h = int(round(src_h * target_ratio)), src_h
    else:
        box_w, box_h = src_w, int(round(src_w / target_ratio))

    if gravity == "left":
        left = 0
    elif gravity == "right":
        left = src_w - box_w
    else:
        left = (src_w - box_w) // 2

    if gravity == "top":
        top = 0
    elif gravity == "bottom":
        top = src_h - box_h
    else:
        top = (src_h - box_h) // 2

    return (left, top, left + box_w, top + box_h)


def format_screenshot(path, outdir, mode, gravity, pad):
    with Image.open(path) as src:
        src.load()
        img = src.convert("RGB")
        original = img.size

        if mode == "crop":
            img = img.crop(crop_box(*img.size, SHOT_W / SHOT_H, gravity))
            canvas = img.resize((SHOT_W, SHOT_H), Image.LANCZOS)
        else:
            colour = pad if pad else sample_pad_colour(img)
            scale = min(SHOT_W / img.width, SHOT_H / img.height)
            new_size = (max(1, round(img.width * scale)), max(1, round(img.height * scale)))
            scaled = img.resize(new_size, Image.LANCZOS)
            canvas = Image.new("RGB", (SHOT_W, SHOT_H), colour)
            canvas.paste(scaled, ((SHOT_W - new_size[0]) // 2, (SHOT_H - new_size[1]) // 2))

    name = os.path.splitext(os.path.basename(path))[0]
    out = os.path.join(outdir, f"{name}-1280x720.png")
    canvas.save(out, "PNG")
    return [(out, canvas.size, original)]


def format_logo(path, outdir, large, pad):
    if not LOGO_MIN <= large <= LOGO_MAX:
        sys.exit(f"--logo-size must be between {LOGO_MIN} and {LOGO_MAX}, got {large}")

    with Image.open(path) as src:
        src.load()
        img = src.convert("RGBA")
        original = img.size

        # Square the source without stretching: fit, then pad to a square canvas.
        if img.width != img.height:
            side = max(img.width, img.height)
            colour = (pad + (255,)) if pad else (0, 0, 0, 0)
            square = Image.new("RGBA", (side, side), colour)
            square.paste(img, ((side - img.width) // 2, (side - img.height) // 2), img)
            img = square

        results = []
        name = os.path.splitext(os.path.basename(path))[0]
        for size, label in ((large, "large"), (LOGO_MEDIUM, "medium"), (LOGO_SMALL, "small")):
            resized = img.resize((size, size), Image.LANCZOS)
            out = os.path.join(outdir, f"{name}-{label}-{size}x{size}.png")
            resized.save(out, "PNG")
            results.append((out, resized.size, original))

    return results


def validate(path, size):
    """Re-open the written file and check it against the marketplace rules."""
    with Image.open(path) as img:
        fmt, actual = img.format, img.size
    problems = []
    if fmt != "PNG":
        problems.append(f"not a PNG (got {fmt})")
    if actual != size:
        problems.append(f"unexpected size {actual[0]}x{actual[1]}")
    if size == (SHOT_W, SHOT_H):
        return problems
    if actual[0] != actual[1]:
        problems.append("logo is not square")
    elif "large" in os.path.basename(path) and not LOGO_MIN <= actual[0] <= LOGO_MAX:
        problems.append(f"large logo outside {LOGO_MIN}-{LOGO_MAX}px")
    return problems


def main():
    ap = argparse.ArgumentParser(description="Format images to Microsoft marketplace media specs.")
    ap.add_argument("--logo", nargs="+", default=[], help="logo source file(s)")
    ap.add_argument("--screenshot", nargs="+", default=[], help="screenshot source file(s)")
    ap.add_argument("--outdir", default="marketplace-media", help="output directory")
    ap.add_argument("--mode", choices=["fit", "crop"], default="fit",
                    help="screenshot strategy: pad to 16:9 (fit) or crop to 16:9 (crop)")
    ap.add_argument("--gravity", choices=["center", "top", "bottom", "left", "right"],
                    default="center", help="which part of the image survives --mode crop")
    ap.add_argument("--logo-size", type=int, default=LOGO_DEFAULT,
                    help=f"large logo edge in px ({LOGO_MIN}-{LOGO_MAX}, default {LOGO_DEFAULT})")
    ap.add_argument("--pad", type=parse_colour, default=None,
                    help="pad colour as hex, e.g. #0b0b12 (default: sampled from the source)")
    args = ap.parse_args()

    if not args.logo and not args.screenshot:
        ap.error("give at least one --logo or --screenshot")

    os.makedirs(args.outdir, exist_ok=True)

    written, failed = [], []
    for path in args.logo:
        written += format_logo(path, args.outdir, args.logo_size, args.pad)
    for path in args.screenshot:
        written += format_screenshot(path, args.outdir, args.mode, args.gravity, args.pad)

    for out, size, original in written:
        problems = validate(out, size)
        status = "ok" if not problems else "FAIL: " + "; ".join(problems)
        print(f"{original[0]}x{original[1]} -> {size[0]}x{size[1]}  {out}  [{status}]")
        if problems:
            failed.append(out)

    print(f"\n{len(written)} file(s) written to {args.outdir}/")
    if failed:
        sys.exit(f"{len(failed)} file(s) failed validation")


if __name__ == "__main__":
    main()
