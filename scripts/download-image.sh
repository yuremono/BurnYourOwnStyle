#!/bin/bash
# Download image from Lorem Picsum
# Usage:
#   ./download-image.sh           # Width 600px (default)
#   ./download-image.sh 800       # Width 800px
#   ./download-image.sh 600 400   # Width 600px x Height 400px

set -e

WIDTH=${1:-600}
HEIGHT=${2:-}
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/../public/images/picsum"
RANDOM_PARAM=$((RANDOM % 10000))

mkdir -p "$OUTPUT_DIR"

get_next_number() {
    local max_num=0
    local files=$(ls "$OUTPUT_DIR"/*.jpg 2>/dev/null || true)
    for f in $files; do
        if [ -f "$f" ]; then
            local filename=$(basename "$f" .jpg)
            if echo "$filename" | grep -qE '^[0-9]+$'; then
                local num=$((10#$filename))
                if [ $num -gt $max_num ]; then
                    max_num=$num
                fi
            fi
        fi
    done
    echo $((max_num + 1))
}

NEXT_NUM=$(get_next_number)
SEQ=$(printf "%03d" $NEXT_NUM)
OUTPUT_FILE="$OUTPUT_DIR/${SEQ}.jpg"

if [ -n "$HEIGHT" ]; then
    URL="https://picsum.photos/${WIDTH}/${HEIGHT}?random=${RANDOM_PARAM}"
    SIZE_INFO="${WIDTH}x${HEIGHT}"
else
    URL="https://picsum.photos/${WIDTH}?random=${RANDOM_PARAM}"
    SIZE_INFO="${WIDTH}px width"
fi

echo "Downloading image ($SIZE_INFO)..."
curl -sL -o "$OUTPUT_FILE" "$URL"

if [ -f "$OUTPUT_FILE" ]; then
    ACTUAL_SIZE=$(file "$OUTPUT_FILE" | grep -oE '[0-9]+x[0-9]+' | head -1)
    echo "Saved: ${SEQ}.jpg ($ACTUAL_SIZE)"
    echo "Path: /images/picsum/${SEQ}.jpg"
else
    echo "Error: Failed to download image"
    exit 1
fi
