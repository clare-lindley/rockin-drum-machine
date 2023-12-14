import { useRef } from "react"

interface YourSoundProps {
    audioKey: string,
    blobUrl: string,
    saveSound: (
        currentSoundName: string, 
        currentSoundKey: string
        ) => void
  }

export default function YourSound(props: YourSoundProps){

    const {saveSound, audioKey, blobUrl} = props

    const currentSoundNameRef = useRef<HTMLInputElement>(null)
    const currentSoundKeyRef = useRef<HTMLInputElement>(null)

    const handleSaveSoundClick = () => {
        console.log('child click passing refs...')
        if(currentSoundNameRef.current && currentSoundKeyRef.current){
            saveSound(currentSoundNameRef.current.value, currentSoundKeyRef.current.value)
        }
        else {
            // @todo how to handle this error?
            console.error('Sorry for some reason we cant save your sound')
        }
      };


return (
    <>
        <p>Your sound</p>
        <audio key={audioKey} controls>
          <source src={blobUrl} type="audio/wav" />
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
        <button onClick={handleSaveSoundClick}>
        Save My Sound!
      </button>
      </>
    )
}

