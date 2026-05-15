# Rule-Guided Active Inference Website

Project website for the ICLR 2026 accepted paper:
**Learning Human Habits with Rule-Guided Active Inference**.

## Local Preview

```bash
cd "/scratch/gongzhiren/active inference/website"
python -m http.server 8091
```

Open `http://localhost:8091`.

## Structure

- `index.html`: full page content and section architecture
- `styles.css`: visual system (dark slate + teal/amber accents)
- `script.js`: interaction (lightbox, tabs, citation copy, nav highlight)
- `assets/`: web-ready figures extracted from paper assets

## Notes

- The website is self-contained and does not depend on parent directories.
- Paper URL can be updated in `Resources` once public camera-ready links are available.
