#!/bin/bash

# Font Download Script for ArtFrost Portfolio
# Downloads self-hosted web fonts: Inter, Roboto, JetBrains Mono

set -e  # Exit on error

FONTS_DIR="public/fonts"
TEMP_DIR="$FONTS_DIR/temp"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔤 Downloading fonts for ArtFrost Portfolio...${NC}\n"

# Create directories
mkdir -p "$FONTS_DIR"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

# 1. Inter Variable
echo -e "${BLUE}📥 Downloading Inter Variable...${NC}"
INTER_VERSION="4.1"
curl -L "https://github.com/rsms/inter/releases/download/v${INTER_VERSION}/Inter-${INTER_VERSION}.zip" -o inter.zip

# Inter zip layout can change between versions; find the variable WOFF2 path dynamically.
INTER_WOFF2_PATH=$(unzip -Z1 inter.zip | grep -iE 'InterVariable\.woff2$' | head -n 1)
if [ -z "$INTER_WOFF2_PATH" ]; then
  INTER_WOFF2_PATH=$(unzip -Z1 inter.zip | grep -iE 'Inter-VariableFont.*\.woff2$' | head -n 1)
fi

if [ -z "$INTER_WOFF2_PATH" ]; then
  echo -e "${RED}✗${NC} Could not find Inter variable WOFF2 in inter.zip"
  unzip -Z1 inter.zip | head -n 20
  exit 1
fi

unzip -q -j inter.zip "$INTER_WOFF2_PATH" -d .

# Normalize output name
INTER_WOFF2_FILE=$(basename "$INTER_WOFF2_PATH")
mv "$INTER_WOFF2_FILE" ../inter-var-latin.woff2
rm inter.zip
echo -e "${GREEN}✅ Inter Variable downloaded${NC}"

# 2. Roboto (Regular, Medium, Bold)
echo -e "\n${BLUE}📥 Downloading Roboto...${NC}"
# Using Google Fonts Helper (pre-converted WOFF2)
curl -L "https://gwfh.mranftl.com/api/fonts/roboto?download=zip&subsets=latin&variants=regular,500,700&formats=woff2" -o roboto-woff2.zip
unzip -q roboto-woff2.zip -d roboto-woff2
# Find and rename files
find roboto-woff2 -name "*regular*.woff2" -exec mv {} ../roboto-regular-latin.woff2 \;
find roboto-woff2 -name "*500*.woff2" -exec mv {} ../roboto-medium-latin.woff2 \;
find roboto-woff2 -name "*700*.woff2" -exec mv {} ../roboto-bold-latin.woff2 \;
rm -rf roboto-woff2 roboto-woff2.zip
echo -e "${GREEN}✅ Roboto downloaded${NC}"

# 3. JetBrains Mono Variable
echo -e "\n${BLUE}📥 Downloading JetBrains Mono Variable...${NC}"
JETBRAINS_VERSION="2.304"
curl -L "https://github.com/JetBrains/JetBrainsMono/releases/download/v${JETBRAINS_VERSION}/JetBrainsMono-${JETBRAINS_VERSION}.zip" -o jetbrains.zip

# Zip layout can change; find the variable WOFF2 path dynamically.
JETBRAINS_WOFF2_PATH=$(unzip -Z1 jetbrains.zip | grep -E 'JetBrainsMono\[wght\]\.woff2$' | head -n 1)
if [ -z "$JETBRAINS_WOFF2_PATH" ]; then
  JETBRAINS_WOFF2_PATH=$(unzip -Z1 jetbrains.zip | grep -iE 'JetBrainsMono.*\.woff2$' | head -n 1)
fi

if [ -z "$JETBRAINS_WOFF2_PATH" ]; then
  echo -e "${RED}✗${NC} Could not find JetBrains Mono variable WOFF2 in jetbrains.zip"
  unzip -Z1 jetbrains.zip | head -n 20
  exit 1
fi

unzip -q -j jetbrains.zip "$JETBRAINS_WOFF2_PATH" -d .

JETBRAINS_WOFF2_FILE=$(basename "$JETBRAINS_WOFF2_PATH")
mv "$JETBRAINS_WOFF2_FILE" ../jetbrains-mono-var-latin.woff2
rm jetbrains.zip
echo -e "${GREEN}✅ JetBrains Mono Variable downloaded${NC}"

# Cleanup
cd ..
rm -rf temp

# Verify all fonts
echo -e "\n${BLUE}🔍 Verifying downloaded fonts...${NC}"
REQUIRED_FONTS=(
  "inter-var-latin.woff2"
  "roboto-regular-latin.woff2"
  "roboto-medium-latin.woff2"
  "roboto-bold-latin.woff2"
  "jetbrains-mono-var-latin.woff2"
)

ALL_PRESENT=true
for font in "${REQUIRED_FONTS[@]}"; do
  if [ -f "$font" ]; then
    SIZE=$(du -h "$font" | cut -f1)
    echo -e "${GREEN}✓${NC} $font (${SIZE})"
  else
    echo -e "${RED}✗${NC} $font - MISSING!"
    ALL_PRESENT=false
  fi
done

if [ "$ALL_PRESENT" = true ]; then
  echo -e "\n${GREEN}🎉 All fonts downloaded successfully!${NC}"
  echo -e "${BLUE}📁 Location: $(pwd)${NC}"
  exit 0
else
  echo -e "\n${RED}❌ Some fonts are missing. Please check the output above.${NC}"
  exit 1
fi
