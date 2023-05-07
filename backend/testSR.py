import speech_recognition as sr
import time

r = sr.Recognizer()

audio_file = sr.AudioFile('backend/EpicurusLectureFull.wav')

with audio_file as source:
    audio_data = r.record(source)

print("running")

start_time = time.time()
text = r.recognize_whisper(audio_data)
end_time = time.time()

time_elapsed = end_time - start_time

with open('output_file1.txt', 'w') as f:
    f.write(text)
print("done", time_elapsed)
