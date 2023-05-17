import speech_recognition as sr
import time
'''
r = sr.Recognizer()

audio_file = sr.AudioFile('backend/EpicurusLectureFull.wav')

with audio_file as source:
    audio_data = r.record(source, duration=None, offset=0)

print("running")

start_time = time.time()
text = r.recognize_whisper(audio_data)
end_time = time.time()

time_elapsed = end_time - start_time

with open('output_filefull.txt', 'w') as f:
    f.write(text)

print("done in", time_elapsed, time_elapsed//60, time_elapsed % 60)
'''


def transcribe_audio(filePath, outputPath):
    r = sr.Recognizer()
    audio_file = sr.AudioFile(filePath)
    with audio_file as source:
        audio_data = r.record(source, duration=None, offset=0)
    print("\n RUNNING TRANSCRIPTION")
    start_time = time.time()
    text = r.recognize_whisper(audio_data)
    end_time = time.time()
    time_elapsed = end_time - start_time

    with open(outputPath, 'w') as f:
        f.write(text)

    print("done in", time_elapsed, time_elapsed//60, time_elapsed % 60)
