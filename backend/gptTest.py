from dotenv import load_dotenv
from splitTranscript import get_chunks
import openai
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


def getNotes():
    with open('output_filefull.txt', 'r') as r:
        notes = []
        try:
            transcription = r.read()
            chunks = get_chunks(transcription)
            lecturePrompt = "This is a transcription of a lecture, write bullet points explaining the content of this lecture, make the bullet points thorough and make sure you cover every part of the lecture, start each bullet point with the symbol '•': \n"
            for c in chunks:
                response = apiCall(lecturePrompt + c)
                notes.append(response)
                print("reponse recieved")

            return notes
        except Exception as e:
            print(e)
            return notes


def apiCall(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    return completion["choices"][0]["message"]["content"]


response = getNotes()
print("="*20)
for r in response:
    print(r)
