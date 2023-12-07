import React, { useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { FormData } from '../types';



export default function  CreateDrumMachineForm()  {

    const [formData, setFormData] = useState<FormData>({currentSound: undefined, allSounds:[]})
    const currentSoundNameRef = useRef<HTMLInputElement>(null)
    const drumMachineNameRef = useRef<HTMLInputElement>(null)
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
        onStop: (blobUrl, blob) => {
            setFormData((previousFormData) => ({...previousFormData, currentSound: {sound: {audioBlob: blob, blobUrl}}}))
        },
      });
    const audioKey = formData.currentSound ? formData.currentSound.sound.blobUrl : 'no-audio';

    
    const saveSound = (event: React.UIEvent<HTMLButtonElement>) => {

        // in this example how can I update the allSounds property of the formState so that it pushes a new value to the array each time and keeps the previous values
        if(currentSoundNameRef.current){
            const currentSoundName = currentSoundNameRef.current.value
            setFormData((previousFormData) => {
              // Don't like that I have to do this. Get it reviewed. I need my audio objects to be initialised and built up over time so some props have to be undefined to begin with
              // Typescript doesn't deal with ambiguity tho and wants you to asert that things are NOT undefined when I know that they will be at this point.
              if(!previousFormData.currentSound){
                return previousFormData
              }
              else {
                console.log('why is this logged twice?')
                return {
                  ...previousFormData,
                  currentSound: {
                    ...previousFormData.currentSound, 
                    name: currentSoundName,
                  },
                  allSounds: [
                    ...(previousFormData.allSounds || []), // Shallow copy of the existing array, or [] if it's undefined and then put the new one on the end
                    {
                      ...previousFormData.currentSound,
                      name: currentSoundName,
                    },
                  ],
                }
              }

            });

        }

    }

    const saveDrumMachine = (event: React.UIEvent<HTMLButtonElement>) => {

      let drumMachineName = drumMachineNameRef.current?.value || ''
      
      console.log('Current Sound: ', formData.currentSound)
      console.log('All Sounds: ', formData.allSounds)
      console.log('Drum Machine name: ', drumMachineName)
    }

return  (
    <>


    <div>
        <label>Give it a name: 
            <input type="text" name="drum-machine-name" ref={drumMachineNameRef}/>
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveSound}>
        Save My Sound!
      </button>


      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveDrumMachine}>
        Save My Drum Machine!
      </button>
        </>
      )}
    </div>

    </>
)

}