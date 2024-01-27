from flask import Flask, request
from flask_cors import CORS
from helperFunctions import convert_to_wav
from audioTranscription import transcribe_audio
from gptFunctions import get_notes
from databaseFunctions import create_note_in_database, update_note_in_database
from random import randint
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
    if 'file' not in request.files:
        return 'No file uploaded.', 400

    file = request.files['file']
    user = request.form["user"]
    noteName = request.form["noteName"].replace(
        " ", "") + str(randint(1000, 9999))
    depth = int(request.form["depth"])
    print(file.filename+" Receieved")
    print(request.form["user"]+" Receieved")
    print(request.form["noteName"]+" Receieved")
    print(request.form["depth"]+" Receieved")

    file.save("backend/videos/"+file.filename)

    newNote = create_note_in_database(
        notes="WAITING", user=user, noteName=noteName)

    print("Converting to wav")
    convert_to_wav("backend/videos/"+file.filename,
                   "backend/audios/audio" + noteName + ".wav")

    print("Transcribing Audio")
    transcribe_audio("backend/audios/audio" + noteName + ".wav",
                     "backend/transcriptions/" + noteName + ".txt")
    print("Summarizing Notes")
    notes = get_notes("backend/transcriptions/" + noteName + ".txt", depth)
    joinedNotes = "|".join(notes)
    update_note_in_database(
        noteId=newNote.noteId, notes=joinedNotes)

    print("DONE")
    return 'success', 200


if __name__ == '__main__':
    app.run(debug=True)
