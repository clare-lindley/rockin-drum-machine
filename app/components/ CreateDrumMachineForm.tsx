import React, { useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { Drum, DrumMachine, FormData, isDrumMachineWithId } from '../types';
import db from '@/utils/dexieDB';
import { IndexableType } from 'dexie';

/**
 * 
 * Save the BLOB
 * Save the key that the user pressed after this as well
 * 
 */

export default function  CreateDrumMachineForm()  {

    const [formData, setFormData] = useState<FormData>({currentSound: undefined, allSounds:undefined})
    const currentSoundNameRef = useRef<HTMLInputElement>(null)
    const currentSoundKeyRef = useRef<HTMLInputElement>(null)
    const drumMachineNameRef = useRef<HTMLInputElement>(null)
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
        onStop: (blobUrl, blob) => {
            setFormData((previousFormData) => ({...previousFormData, currentSound: {sound: {audioBlob: blob, blobUrl}}}))
        },
      });
    const audioKey = formData.currentSound ? formData.currentSound.sound.blobUrl : 'no-audio';

    
    const saveSound = (event: React.UIEvent<HTMLButtonElement>) => {

        if(currentSoundNameRef.current && currentSoundKeyRef.current){
            const currentSoundName = currentSoundNameRef.current.value
            const currentSoundKey = currentSoundKeyRef.current.value
            setFormData((previousFormData) => {
              // Don't like that I have to do this. Get it reviewed. I need my audio objects to be initialised and built up over time so some props have to be undefined to begin with
              // Typescript doesn't deal with ambiguity tho and wants you to asert that things are NOT undefined when I know that they *will* be at this point.
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
                      key: currentSoundKey,
                    },
                  ],
                }
              }

            });

        }

    }

    const saveDrumMachine = (event: React.UIEvent<HTMLButtonElement>) => {

      let drumMachineName = drumMachineNameRef.current?.value || ''

      db.transaction('rw', db.drums, db.drumMachines, async () => {

        if(formData.allSounds){
          const drumMachine :DrumMachine = {
            name: drumMachineName
          }
          const dmId: IndexableType = await db.drumMachines.add(drumMachine);
          
          const drums:Drum[] = formData.allSounds.map(sound => 
           ({
            audioFileUrl: sound.sound.blobUrl || '', // @todo WHY did I do this and is it OK?
            audioBlob: sound.sound.audioBlob || '',
            key: sound.key || '',
            name: sound.name || '',
            drumMachineId: dmId as number
          }))

          await db.drums.bulkAdd(drums);

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
        <div>
        <label>What is the sound called?: 
            <input type="text" name="current-sound-name" ref={currentSoundNameRef}/>
        </label>
        </div>
        <div>
                <label>What key would you like to press to play the sound?: 
            <input type="text" name="current-sound-key" ref={currentSoundKeyRef}/>
        </label>
        </div>
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