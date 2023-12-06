import React, { useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { Recording } from '../types'; 


interface Sound {
    sound: Recording,
    name?: string
}

interface FormData {
    drumMachineName: string,
    currentSound?: Sound,
    allSounds?: Sound[]
}



export default function  CreateDrumMachineForm()  {

    const [formData, setFormData] = useState<FormData>({drumMachineName:'', currentSound: undefined})

    // don't want to save this in state and use onChange to capture it every time someone types so let's use a ref
    // we don't need React to manage it we can just fetch it straight outta the DOM
    const currentSoundNameRef = useRef<HTMLInputElement>(null)
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
        onStop: (blobUrl, blob) => {
            setFormData((previousFormData) => ({...previousFormData, currentSound: {sound: {audioBlob: blob, blobUrl}}}))
        },
      });

    // Use a unique key based on blobUrl - this is so that React knows to re-render the preview when the sound changes :) 
    const audioKey = formData.currentSound ? formData.currentSound.sound.blobUrl : 'no-audio';

    const saveMySound = (event: React.UIEvent<HTMLButtonElement>) => {

        // 1. Give the current sound a NAME (overwrite currentSound with new data)

        // 2. Add current sound to a list of sounds we want to save
        console.log('saving the sound to the drum machine LOCALLY')
        console.log({formData})
        if(currentSoundNameRef.current){
            console.log(currentSoundNameRef.current.value)
        }


        //setFormData((previousFormData) => ({...previousFormData, currentSound: {sound: {audioBlob: blob, blobUrl}}}))

    }

return  (
    <>

    <div>
        <label>Give it a name: 
            <input type="text" name="drum-machine-name" />
        </label>
    </div>
    <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startRecording} disabled={status === 'recording'}>
        Start Recording
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={stopRecording} disabled={status !== 'recording'}>
        Stop Recording
      </button>
      {formData.currentSound && (
        <>
        <p>Your sound</p>
        <audio key={audioKey} controls>
          <source src={formData.currentSound.sound.blobUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
        <label>What is the sound called?: 
            <input type="text" name="current-sound-name" ref={currentSoundNameRef}/>
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveMySound}>
        Save My Sound
      </button>
        </>
      )}
    </div>

    </>
)

}