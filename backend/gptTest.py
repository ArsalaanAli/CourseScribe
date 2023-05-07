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

            response = openai.Completion.create(
                model="gpt-3.5-turbo", prompt="hi there", temperature=0, max_tokens=7)
            return response
        except Exception as e:
            print(e)
            return None


response = runApiCall()

print(response)
