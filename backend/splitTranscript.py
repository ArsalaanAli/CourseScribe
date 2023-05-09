def splitTranscript(transcript):
    sentences = transcript.split(".")
    wordCount = 0
    chunks = []

    for s in sentences:
        words = s.count(" ")
        wordCount += words

    return sentences


transcript = "Hi everybody, welcome back to philosophy 2073 death. Um, I said it in such an excited way. Uh, this is the first video lecture that I'll be producing for week five. I'm going to produce two, one for each of the two separate readings that are Epicurus, one's three pages long, one's four pages long, so I don't expect these video lectures to be terribly lengthy. Um, the first thing that I want to, uh, do, however, is a very quick review and then to talk about what it means that there's been a shift in the course. So, um, this is the first video lecture for unit two. Uh, why is death bad?"

splitTranscript(transcript)
