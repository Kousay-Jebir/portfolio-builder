import ollama

def stream_chat_response(prompt: str):
    stream = ollama.chat(
        model="mistral",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )

    def token_stream():
        for chunk in stream:
            yield chunk['message']['content']

    return token_stream()

