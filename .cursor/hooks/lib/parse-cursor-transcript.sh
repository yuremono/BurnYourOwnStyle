#!/usr/bin/env bash
# Cursor 用トランスクリプトパーサー（parse-cursor-transcript.py のラッパー）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$SCRIPT_DIR/parse-cursor-transcript.py" "$@"
