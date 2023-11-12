import db from '@/utils/dexieDB';
import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { Recording } from '../types';

/**
 * 
 * SPIKE 1 Record a sound and save it in IDB and read it back and play it in a different player on the homepage ✅ DONE! 
 */

const AudioRecorder = () => {
  // recordings are what we get from indexedDB and we need them
  // in state because we are displaying them 
  const [recordings, setRecordings] = useState<Recording[] | undefined>();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl, blob) => {
      saveAudioToIndexedDB(blobUrl, blob);
    },
  });

  const saveAudioToIndexedDB = (blobUrl:string, audioBlob: Blob) => {
    db.recordings.add({ audioBlob, blobUrl })
      .then(() => {
        console.log('Audio saved to IndexedDB');
        fetchRecordingsFromIndexedDB();
      })
      .catch((error) => {
        console.error('Error saving audio to IndexedDB:', error);
      });
  };

  const fetchRecordingsFromIndexedDB = async () => {
    const allRecordings = await db.recordings.toArray();
    setRecordings(allRecordings);
  };

  /**
   * startRecording and stopRecording are functions from the useReactMediaRecorder hook
   * status is from useReactMediaRecorder and tells us whether we are recording or not
   * mediaBlobUrl is a link to the LOCALLY saved audio that we can preview for the user
   * useReactMediaRecorder takes an options object
   */
  return (
    <div>
      <h1>Audio Recorder</h1>
      <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={startRecording} disabled={status === 'recording'}>
        Start Recording
      </button>
      <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={stopRecording} disabled={status !== 'recording'}>
        Stop Recording
      </button>

      {mediaBlobUrl && (
        <audio controls>
          <source src={mediaBlobUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}


    {recordings && (
        <>
            <h2>Recorded Audio List</h2>
            <ul>
                {recordings.map((recording) => (
                <li key={recording.id}>
                    <audio controls>
                    <source src={URL.createObjectURL(recording.audioBlob)} type="audio/wav" />
                    Your browser does not support the audio element.
                    </audio>
                </li>
                ))}
            </ul>
        </>
    )}

    </div>
  );
};

export default AudioRecorder;
