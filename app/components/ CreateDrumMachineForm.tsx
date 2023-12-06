import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { Recording } from '../types'; 

interface FormData {
    drumMachineName: string,
    currentSound?: Recording
}



export default function  CreateDrumMachineForm()  {

    /**
     * 
     * AUDIO RECORDING - ONE OFF - SAVE TO FORM STATE, READ FROM FORM STATE AND PLAY IN A PLAYA
     * 
     *  start recording on click
     *  stop recording and save the blob to the form state
     * do a test with an <audio> tag
     */

    // 2 things in state - DM name, current sound
    // @todo whats best way to initialise this? 
    const [formData, setFormData] = useState<FormData>({drumMachineName:'', currentSound: undefined})

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
        onStop: (blobUrl, blob) => {
            setFormData((previousFormData) => ({...previousFormData, currentSound: {audioBlob: blob, blobUrl}}))
        },
      });





return  (
    <>

    <div>
        <label>Give it a name: 
            <input type="text" name="drum-machine-name" />
        </label>
    </div>
    <div>
        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={startRecording} disabled={status === 'recording'}>
        Start Recording
      </button>
      <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={stopRecording} disabled={status !== 'recording'}>
        Stop Recording
      </button>
      {formData.currentSound && (
        <audio controls>
          <source src={formData.currentSound.blobUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>



    </>
)

}