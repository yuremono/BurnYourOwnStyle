#!/usr/bin/env python3
"""
Cursor 用トランスクリプトパーサー
JSONL 形式の agent-transcripts から最終ターン（最後の user + assistant ペア）を抽出し、
要約用テキストとして出力する。
"""
import json
import sys
from pathlib import Path


def extract_text_from_content(content: list) -> str:
    """message.content から type=text のテキストを連結"""
    parts = []
    for item in content:
        if isinstance(item, dict) and item.get("type") == "text" and "text" in item:
            parts.append(item["text"])
    return "\n".join(parts).strip()


def parse_transcript(path: str) -> str:
    """トランスクリプトから最終ターンを抽出し、User: ...\nAssistant: ... 形式で返す"""
    p = Path(path)
    if not p.exists():
        return ""

    last_user = ""
    last_assistant_parts = []

    with open(p, encoding="utf-8", errors="replace") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue

            role = obj.get("role")
            message = obj.get("message") or {}
            content = message.get("content") or []
            text = extract_text_from_content(content)

            if role == "user":
                last_user = text
                last_assistant_parts = []
            elif role == "assistant" and text:
                last_assistant_parts.append(text)

    if not last_user and not last_assistant_parts:
        return ""

    user_part = f"User: {last_user}" if last_user else ""
    assistant_part = "Assistant: " + "\n".join(last_assistant_parts) if last_assistant_parts else "Assistant: (no response)"
    return "\n\n".join(filter(None, [user_part, assistant_part]))


def main():
    if len(sys.argv) < 2:
        print("Usage: parse-cursor-transcript.py <transcript.jsonl>", file=sys.stderr)
        sys.exit(1)
    result = parse_transcript(sys.argv[1])
    if result:
        print(result)


if __name__ == "__main__":
    main()
