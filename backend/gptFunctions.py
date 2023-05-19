from dotenv import load_dotenv
from helperFunctions import get_chunks
import openai
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


def get_notes(transcriptFile):
    with open(transcriptFile, 'r') as r:
        notes = []
        try:
            transcription = r.read()
            chunks = get_chunks(transcription)
            lecturePrompt = "This is a transcription of a lecture, write bullet points explaining the content of this lecture, return the bullet points as strings in a list with this format 'point1 | point2 | point3...' : \n"
            for c in chunks:
                response = gpt_call(lecturePrompt + c)
                for point in response.split("|"):
                    notes.append(point)
                print("reponse recieved")
            return notes
        except Exception as e:
            print(e)
            return notes


def add_notes_to_database(notes):
    print(notes)


def gpt_call(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    return completion["choices"][0]["message"]["content"]
