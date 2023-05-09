def get_chunks(transcript):
    sentences = transcript.split(".")
    wordCount = 0
    base = 0
    chunks = []

    for i, s in enumerate(sentences):
        words = s.count(" ")

        wordCount += words
        if wordCount > 1500 or i == len(sentences)-1:
            chunks.append("".join(sentences[base:i+1]))
            wordCount = 0
            base = i+1
    return chunks
