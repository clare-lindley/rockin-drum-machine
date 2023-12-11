import React, { useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { Drum, DrumMachine, FormData, isDrumMachineWithId } from '../types';
import db from '@/utils/dexieDB';
import Dexie, { IndexableType } from 'dexie';



export default function  CreateDrumMachineForm()  {

    const [formData, setFormData] = useState<FormData>({currentSound: undefined, allSounds:undefined})
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

        if(currentSoundNameRef.current){
            const currentSoundName = currentSoundNameRef.current.value
            setFormData((previousFormData) => {
              // Don't like that I have to do this. Get it reviewed. I need my audio objects to be initialised and built up over time so some props have to be undefined to begin with
              // Typescript doesn't deal with ambiguity tho and wants you to asert that things are NOT undefined when I know that they will be at this point.
              if(!previousFormData.currentSound){
                return previousFormData
              }
              else {
                console.log('why is this logged twice when saveSound is called?')
                return {
                  ...previousFormData,
                  currentSound: {
                    ...previousFormData.currentSound, 
                    name: currentSoundName,
                  },
                  allSounds: [
                    ...(previousFormData.allSounds || []),
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


      /**
       * Turn allSounds into an array of Drums to add
       * Read the latest drum machine from the db and display it on the homepage as a react
       * component
       * Sort out the UI
       * Clean up and tests
       */

      let drumMachineName = drumMachineNameRef.current?.value || ''

      db.transaction('rw', db.drums, db.drumMachines, async () => {
        const drumMachine :DrumMachine = {
          name: drumMachineName
        }
        const dmId: IndexableType = await db.drumMachines.add(drumMachine);
        const drum: Drum = {
          audioFileUrl: formData.currentSound?.sound?.blobUrl || '',
          key: 'Q',
          name: formData.currentSound?.name || '',
          drumMachineId: dmId as number
        }
        await db.drums.add(drum);
        const dbDrumMachine:DrumMachine | undefined = await db.drumMachines.get(dmId);

        if (dbDrumMachine && isDrumMachineWithId(dbDrumMachine)) {
          console.log(`Drum Machine: ${dbDrumMachine.name}`);
          console.log('Drums:', dbDrumMachine.drums);
        } 
    
      }).catch((error) => {
        console.error(error);
      });
      
    }

return  (
    <>
    <div>
      <p>DEBUG: RECORDING STATUS IS: {status}</p>
        <label>Give it a name: 
            <input type="text" name="drum-machine-name" ref={drumMachineNameRef}/>
        </label>
        {formData.allSounds && (
          <>
            <p>Your sounds:</p>
            <ul>
            {formData.allSounds.map((sound, index) => (
              <li key={sound.sound.blobUrl}>
                      {sound.name}
                      <audio controls>
                      <source src={sound.sound.blobUrl} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                    </li>
            ))}
          </ul>
        </>
        )}
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