from dotenv import load_dotenv
from splitTranscript import get_chunks
import openai
import os

load_dotenv()
api_key = os.getenv('API_KEY')
db_name = os.getenv('DB_NAME')

openai.api_key = os.getenv("OPENAI_API_KEY")


def runApiCall():
    with open('output_filefull.txt', 'r') as r:
        try:
            transcription = r.read()
            chunks = get_chunks(transcription)
            lecturePrompt = "This is a transcription of a lecture, write bullet points explaining the content of this lecture, make the bullet points thorough and make sure you cover every part of the lecture, start each bullet point with the symbol '•': \n" + \
                chunks[3]
            completion = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": lecturePrompt}
                ]
            )
            return completion
        except Exception as e:
            print(e)
            return None


response = runApiCall()

print(response)
