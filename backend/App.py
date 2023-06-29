from flask import Flask, request
from flask_cors import CORS
from helperFunctions import convert_to_wav
from audioTranscription import transcribe_audio
from gptFunctions import get_notes
from databaseFunctions import add_notes_to_database
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
        file = request.files['file']
        user = request.form["user"]
        noteName = request.form["noteName"]
    else:
        if 'file' not in request.files:
            return 'No file uploaded.', 400

        file = request.files['file']
        user = request.form["user"]
        noteName = request.form["noteName"]
        print(file.filename+" Receieved")
        print(request.form["user"]+" Receieved")
        print(request.form["noteName"]+" Receieved")

        file.save("backend/videos/"+file.filename)

        print("Converting to wav")
        convert_to_wav("backend/videos/"+file.filename,
                       "backend/audios/audio.wav")

        print("Transcribing Audio")
        transcribe_audio("backend/audios/audio.wav",
                         "backend/transcriptions/transcript.txt")

    print("Summarizing Notes")
    notes = get_notes("backend/transcriptions/transcript.txt")
    joinedNotes = "|".join(notes)
    # get user and notename
    add_notes_to_database(notes=joinedNotes, user=user, noteName=noteName)

    print("DONE")
    return 'success', 200


if __name__ == '__main__':
    app.run(debug=True)
