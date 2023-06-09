from flask import Flask, request
from flask_cors import CORS
from helperFunctions import convert_to_wav
from audioTranscription import transcribe_audio
from gptFunctions import get_notes, add_notes_to_database
import os
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'Hello World!'


@app.route('/test', methods=['GET'])
def test():
    return "test works!", 200


@app.route('/upload', methods=['POST'])
def upload_file():

    if os.path.exists("backend/transcriptions/transcript.txt"):
        notes = get_notes("backend/transcriptions/transcript.txt")
    else:
        if 'file' not in request.files:
            return 'No file uploaded.', 400

        file = request.files['file']
        print(file.filename+" Receieved")
        file.save("backend/videos/"+file.filename)

        print("Converting to wav")
        convert_to_wav("backend/videos/"+file.filename,
                       "backend/audios/audio.wav")

        print("Transcribing Audio")
        transcribe_audio("backend/audios/audio.wav",
                         "backend/transcriptions/transcript.txt")

        print("Summarizing Notes")
        notes = get_notes("backend/transcriptions/transcript.txt")

    add_notes_to_database(notes)

    print("DONE")
    return notes, 200


if __name__ == '__main__':
    app.run(debug=True)
