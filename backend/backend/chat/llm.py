import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.1:8b"  # 可換成 mistral, qwen, 自己拉的模型

def call_ollama(user_text: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": user_text,
        "stream": False   # 關掉 streaming，方便處理
    }
    try:
        resp = requests.post(OLLAMA_URL, json=payload, timeout=120)
        resp.raise_for_status()
        data = resp.json()
        return data.get("response", "").strip()
    except Exception as e:
        return f"(LLM 呼叫失敗:請聯絡維護人員)"