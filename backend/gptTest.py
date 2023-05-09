from dotenv import load_dotenv
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

            lecturePrompt = "This is a transcription of a lecture, write in depth bullet points explaining the content of this lecture: \n" + transcription

            # completion = openai.ChatCompletion.create(
            #     model="gpt-3.5-turbo",
            #     messages=[
            #         {"role": "user", "content": "Hello!"}
            #     ]
            # )
            return None
        except Exception as e:
            print(e)
            return None


response = runApiCall()

print(response)
