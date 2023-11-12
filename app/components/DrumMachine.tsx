import { useState } from "react"
import { DatabaseDrum, DrumMachineProps } from "../types"
import DrumPad from "./DrumPad"
import React from "react"

export default function DrumMachineUI(props: DrumMachineProps) {

    const { drums } = props
  
    const [currentDrum, setCurrentDrum] = useState<string | undefined>()

    function playDrumPad(drum: DatabaseDrum){
      setCurrentDrum(drum.name)
      const audio = document.getElementById(drum.key) as HTMLAudioElement
      audio?.play()
    }
  
    function handleDrumClick(drum: DatabaseDrum){
      playDrumPad(drum)
    }
  
    function handleDrumKeyPress(event: KeyboardEvent){
      const selected = event.key.toUpperCase()
      const drum = drums.find((drum) => drum.key === selected)
      if(drum){
        playDrumPad(drum)
      }
    }
  
    React.useEffect(() => {
      window.addEventListener('keydown', handleDrumKeyPress);
      return () => {
        window.removeEventListener('keydown', handleDrumKeyPress);
      };
    }, []);
   
    
    return (
      <main id="drum-machine">
        {currentDrum && <div id="display">Sound: {currentDrum}</div>}
       {drums.map((drum) =>  <DrumPad drum={drum} key={drum.id} onDrumClick={() => handleDrumClick(drum)}></DrumPad>)}
      </main>
    );
  }