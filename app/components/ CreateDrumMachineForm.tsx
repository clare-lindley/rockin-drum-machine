import React, { useRef, useState } from 'react';
import { Drum, DrumMachine, FormData } from '../types';
import db from '@/utils/dexieDB';
import { IndexableType } from 'dexie';
import YourSound from './YourSound';
import YourSounds from './YourSounds';
import Image from 'next/image';
import useMediaRecorder from '../hooks/useMediaRecorder';


export default function  CreateDrumMachineForm()  {

    const [formData, setFormData] = useState<FormData>({currentSound: undefined, allSounds:undefined})

    const drumMachineNameRef = useRef<HTMLInputElement>(null)

    const {stopRecording, startRecording, permission, recordingStatus} = useMediaRecorder({
      onStop: (blob, blobUrl) => {
        setFormData((previousFormData) => ({...previousFormData, currentSound: {sound: {audioBlob: blob, blobUrl}}}))
      }
    });
    const audioKey = formData.currentSound ? formData.currentSound.sound.blobUrl : 'no-audio';

    const saveSound = (currentSoundName:string, currentSoundKey:string) => {



      setFormData((previousFormData) => {
        // @todo Don't like that I have to do this. Get it reviewed. I need my audio objects to be initialised and built up over time so some props have to be undefined to begin with
        // Typescript doesn't deal with ambiguity tho and wants you to asert that things are NOT undefined when I know that they *will* be at this point.
        if(!previousFormData.currentSound){
          return previousFormData
        }
        else {
          console.log('why is this logged twice when this func is is called?')
          const newAllSounds = new Set(previousFormData.allSounds);
          newAllSounds.add({
            ...previousFormData.currentSound,
            name: currentSoundName,
            key: currentSoundKey,
          });
          return {
            ...previousFormData,
            currentSound: {
              ...previousFormData.currentSound, 
              name: currentSoundName,
            },
            allSounds: newAllSounds,
          }
        }

      });

    }

    const saveDrumMachine = (event: React.UIEvent<HTMLButtonElement>) => {

      let drumMachineName = drumMachineNameRef.current?.value || ''

      db.transaction('rw', db.drums, db.drumMachines, async () => {

        if(formData.allSounds){
          const createdAt = Date.now()
          const drumMachine :DrumMachine = {
            name: drumMachineName,
            createdAt
          }
          const dmId: IndexableType = await db.drumMachines.add(drumMachine);
          
          const drums:Drum[] = Array.from(formData.allSounds).map(sound => 
           ({
            audioFileUrl: sound.sound.blobUrl || '', // @todo WHY did I do this and is it OK?
            audioBlob: sound.sound.audioBlob || '',
            key: sound.key || '',
            name: sound.name || '',
            drumMachineId: dmId as number,
            createdAt
          }))

          await db.drums.bulkAdd(drums);

        }
    
      }).catch((error) => {
        console.error(error);
      });
      
    }

   const showYourSound = ():boolean => {

    // When the recording stops and we have a sound saved in the state we display <YourSound />...
    if(formData.currentSound){
      if(formData.allSounds){
        // ... and once the user has previewed the sound they just uploaded and has accepted it - by clicking 
        // the 'Save my Sound' button (i.e. the 'currentSound' object has safely arrived in the 'allSounds' Set)
        // - we don't need to display the <YourSound /> component any more :) 
        const allSounds = Array.from(formData.allSounds);
        const lastSoundAdded = allSounds[allSounds.length - 1];
        if(lastSoundAdded.sound.blobUrl === formData.currentSound.sound.blobUrl){
          return false
        }

      }
      return true
    }
    return false
   } 

return  (
<>
  {permission ? (
  <>
       {/* Name the DM */}
        <label>Give it a name: 
            <input type="text" name="drum-machine-name" ref={drumMachineNameRef}/>
        </label>


      {/* Start/stop recording */}
      {recordingStatus === 'recording' && (
        <div className="audio-recording">
        <Image
          src="/audio.svg" 
          alt="Your SVG"
          width={40} 
          height={40} 
        />
      </div>
      )}
      <button style={{ display: (recordingStatus === 'stopped' && showYourSound()) ? 'none' : 'block' }} onClick={recordingStatus === 'recording' ? stopRecording : startRecording}>
      {recordingStatus === 'recording' ? 'Stop Recording' : 'Start Recording'}
      </button>


      {/* List of all sounds user has recorded */}
      {(formData.allSounds && Array.from(formData.allSounds).length) && (
      <YourSounds allSounds={Array.from(formData.allSounds)}/>
      )}

      {/* Current sound the user has just recorded */}
      {(showYourSound() && formData.currentSound) && (
        <>
          <YourSound saveSound={saveSound} audioKey={audioKey} blobUrl={formData.currentSound.sound.blobUrl}/>
        </>
      )}

        {/* Save Drum Machine button */}
        {(formData.allSounds && Array.from(formData.allSounds).length) && (
               <button onClick={saveDrumMachine}>
               Save My Drum Machine!
             </button>
        )}
  </>) : null }
</>
)

}