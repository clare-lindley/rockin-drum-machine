import { useEffect, useState } from "react"
import { Drum, DrumMachineProps } from "../types"
import DrumPad from "./DrumPad"
import React from "react"
import { openDatabase } from "@/utils/indexedDB"

export default function DrumMachine(props: DrumMachineProps) {

    const { drums } = props
  
    const [currentDrum, setCurrentDrum] = useState<string | undefined>()


    /*
        How does useEffect work?
        How can I put data in indexedDb?
        How can I read data from indexedDb?
    */

    useEffect(() => {
        const fetchDataFromIndexedDB = async () => {
          try {
            const db:IDBDatabase = await openDatabase();
            console.log({db})

            // This is what our customer data looks like.

            // create and insert the drums
            // create a record in the object store
            // read that
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchDataFromIndexedDB();
      }, []);
  
    function playDrumPad(drum: Drum){
      setCurrentDrum(drum.name)
      const audio = document.getElementById(drum.key) as HTMLAudioElement
      audio?.play()
    }
  
    function handleDrumClick(drum: Drum){
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
       {drums.map((drum, index) =>  <DrumPad drum={drum} key={drum.id} onDrumClick={() => handleDrumClick(drum)}></DrumPad>)}
      </main>
    );
  }