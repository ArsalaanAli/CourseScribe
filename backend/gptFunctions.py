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
            lecturePrompt = "You are getting multiple segments of a transcription of a lecture, write points explaining the content of this lecture, make the points long and in depth but make sure they are clear and easy to understand, seperate each point with the symbol '•' : \n"
            for c in chunks:
                response = api_call(lecturePrompt + c)
                response = response.split("•")
                for r in response:
                    r = r.strip("\n")
                    notes.append(r)
                print("reponse recieved")
            return notes
        except Exception as e:
            print(e)
            return notes


def api_call(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    return completion["choices"][0]["message"]["content"]
