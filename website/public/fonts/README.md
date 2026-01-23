# Fonts Setup Guide

## Required Fonts

This project uses self-hosted fonts for optimal performance and privacy:

1. **Inter** (Variable) - Display & Headings
2. **Roboto** (Regular, Medium, Bold) - Body Text  
3. **JetBrains Mono** (Variable) - Monospace/Code

## Download Instructions

### 1. Inter Variable

**Source:** [Google Fonts](https://fonts.google.com/specimen/Inter) or [GitHub](https://github.com/rsms/inter)

```bash
# Using Google Fonts Helper
# 1. Visit: https://gwfh.mranftl.com/fonts/inter
# 2. Select "Variable" font
# 3. Download "inter-var-latin.woff2"
# 4. Place in public/fonts/
```

**Direct Download:**
- [Inter Variable (GitHub Releases)](https://github.com/rsms/inter/releases/latest)
- Extract `InterVariable.woff2` and rename to `inter-var-latin.woff2`

### 2. Roboto

**Source:** [Google Fonts](https://fonts.google.com/specimen/Roboto)

```bash
# Using Google Fonts Helper
# 1. Visit: https://gwfh.mranftl.com/fonts/roboto
# 2. Select weights: 400 (Regular), 500 (Medium), 700 (Bold)
# 3. Select charsets: latin
# 4. Download woff2 files
# 5. Place in public/fonts/
```

**Files needed:**
- `roboto-regular-latin.woff2` (400)
- `roboto-medium-latin.woff2` (500)
- `roboto-bold-latin.woff2` (700)

### 3. JetBrains Mono Variable

**Source:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

```bash
# Download from official site
# 1. Visit: https://www.jetbrains.com/lp/mono/
# 2. Download latest version
# 3. Extract "JetBrainsMono[wght].woff2" (variable font)
# 4. Rename to "jetbrains-mono-var-latin.woff2"
# 5. Place in public/fonts/
```

## Quick Setup Script

Run this from the project root to download fonts automatically:

```bash
#!/bin/bash
# download-fonts.sh

cd public/fonts

# Inter Variable
curl -L "https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip" -o inter.zip
unzip -j inter.zip "Inter Desktop/InterVariable.woff2" -d .
mv InterVariable.woff2 inter-var-latin.woff2
rm inter.zip

# Roboto (using google-webfonts-helper)
curl -L "https://gwfh.mranftl.com/api/fonts/roboto?download=zip&subsets=latin&variants=regular,500,700" -o roboto.zip
unzip roboto.zip
mv roboto-v30-latin-regular.woff2 roboto-regular-latin.woff2
mv roboto-v30-latin-500.woff2 roboto-medium-latin.woff2
mv roboto-v30-latin-700.woff2 roboto-bold-latin.woff2
rm roboto.zip *.woff

# JetBrains Mono Variable
curl -L "https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-2.304.zip" -o jetbrains.zip
unzip -j jetbrains.zip "fonts/variable/JetBrainsMono[wght].woff2" -d .
mv "JetBrainsMono[wght].woff2" jetbrains-mono-var-latin.woff2
rm jetbrains.zip

echo "✅ All fonts downloaded successfully!"
```

Make it executable and run:

```bash
chmod +x download-fonts.sh
./download-fonts.sh
```

## Manual Download (Recommended)

For production use, it's recommended to download fonts manually to ensure you get the exact versions:

### Inter Variable
1. Visit: https://github.com/rsms/inter/releases/latest
2. Download `Inter-X.X.zip`
3. Extract `Inter Desktop/InterVariable.woff2`
4. Rename to `inter-var-latin.woff2`
5. Place in `public/fonts/`

### Roboto
1. Visit: https://fonts.google.com/specimen/Roboto
2. Click "Download family"
3. Extract the zip and find `static/Roboto-Regular.ttf`, `Roboto-Medium.ttf`, `Roboto-Bold.ttf`
4. Convert to woff2 using [transfonter.org](https://transfonter.org/) or [fonttools](https://github.com/fonttools/fonttools)
5. Rename to match required filenames
6. Place in `public/fonts/`

### JetBrains Mono Variable
1. Visit: https://github.com/JetBrains/JetBrainsMono/releases/latest
2. Download `JetBrainsMono-X.XXX.zip`
3. Extract `fonts/variable/JetBrainsMono[wght].woff2`
4. Rename to `jetbrains-mono-var-latin.woff2`
5. Place in `public/fonts/`

## Verification

After downloading, your `public/fonts/` directory should contain:

```
public/fonts/
├── inter-var-latin.woff2
├── roboto-regular-latin.woff2
├── roboto-medium-latin.woff2
├── roboto-bold-latin.woff2
└── jetbrains-mono-var-latin.woff2
```

## Performance Optimization

These fonts are configured with:
- ✅ `font-display: swap` - Show fallback font immediately
- ✅ `unicode-range` - Only load characters we need (Latin)
- ✅ Variable fonts where possible - Reduces file count
- ✅ WOFF2 format - Best compression (50-70% smaller than TTF)

**Expected file sizes:**
- Inter Variable: ~100-120 KB
- Roboto Regular: ~15-20 KB
- Roboto Medium: ~15-20 KB  
- Roboto Bold: ~15-20 KB
- JetBrains Mono Variable: ~80-100 KB

**Total:** ~250-300 KB (acceptable for web fonts)

## License Information

- **Inter:** SIL Open Font License 1.1
- **Roboto:** Apache License 2.0
- **JetBrains Mono:** SIL Open Font License 1.1

All fonts are free for commercial use.
