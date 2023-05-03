import speech_recognition as sr
import time

r = sr.Recognizer()

audio_file = sr.AudioFile('backend/EpicurusLecture.wav')

with audio_file as source:
    audio_data = r.record(source)

print("running")

start_time = time.time()
text = r.recognize_whisper(audio_data)
end_time = time.time()

time_elapsed = end_time - start_time

with open('output_file.txt', 'w') as f:
    f.write(text)

print("done in", time_elapsed)