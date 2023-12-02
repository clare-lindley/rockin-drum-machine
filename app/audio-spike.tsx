<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audio Recorder and IndexedDB</title>
</head>
<body>
  <button id="startRecording">Start Recording</button>
  <button id="stopRecording" disabled>Stop Recording</button>
  <button id="playRecording" disabled>Play Recording</button>

  <script src="https://cdn.jsdelivr.net/npm/dexie@3"></script>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const startRecordingButton = document.getElementById('startRecording');
      const stopRecordingButton = document.getElementById('stopRecording');
      const playRecordingButton = document.getElementById('playRecording');

      let mediaRecorder;
      let recordedChunks = [];

      startRecordingButton.addEventListener('click', startRecording);
      stopRecordingButton.addEventListener('click', stopRecording);
      playRecordingButton.addEventListener('click', playRecording);

      function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                recordedChunks.push(event.data);
              }
            };

            mediaRecorder.onstop = () => {
              const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });

              // Save the audio in IndexedDB using Dexie
              saveAudioToIndexedDB(audioBlob);
            };

            mediaRecorder.start();
            startRecordingButton.disabled = true;
            stopRecordingButton.disabled = false;
            playRecordingButton.disabled = true;
          })
          .catch((error) => {
            console.error('Error accessing microphone:', error);
          });
      }

      function stopRecording() {
        mediaRecorder.stop();
        startRecordingButton.disabled = false;
        stopRecordingButton.disabled = true;
        playRecordingButton.disabled = false;
      }

      function playRecording() {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioURL);
        audio.play();
      }

      // Dexie setup
      const db = new Dexie('AudioDB');
      db.version(1).stores({
        recordings: '++id,audioBlob',
      });

      function saveAudioToIndexedDB(audioBlob) {
        db.recordings.add({ audioBlob })
          .then(() => {
            console.log('Audio saved to IndexedDB');
          })
          .catch((error) => {
            console.error('Error saving audio to IndexedDB:', error);
          });
      }
    });
  </script>
</body>
</html>
