import os
from helperFunctions import convert_to_wav
from audioTranscription import transcribe_audio
from gptFunctions import get_notes
from databaseFunctions import add_notes_to_database
import asyncio

if os.path.exists("backend/transcriptions/transcript.txt"):
    if os.path.exists("backend/notes/note.txt"):
        with open("backend/notes/note.txt", 'r') as file:
            notes = file.read()
            print("ok")
            created_note = asyncio.run(add_notes_to_database(
                user="clilx27xg0000ujt8ln7e0hve", notes=notes, noteName="testNotePsych"))
            print(created_note)

    else:
        print("GETTING")
        notes = get_notes("backend/transcriptions/transcript.txt")
        joinedNotes = "|".join(notes)
        with open("backend/notes/note.txt", 'w') as file:
            file.write(joinedNotes)
        add_notes_to_database(joinedNotes)
else:
    exit()
    filename = "EpicurusLectureFull.wav"
    print("Converting to wav")
    convert_to_wav("backend/videos/"+filename,
                   "backend/audios/audio.wav")

    print("Transcribing Audio")
    transcribe_audio("backend/audios/audio.wav",
                     "backend/transcriptions/transcript.txt")

    print("Summarizing Notes")
    notes = get_notes("backend/transcriptions/transcript.txt")
