"use client"

import React, { useEffect, useState } from "react";
import AudioRecorder from "./AudioRecorder";

interface Drum {
    id: string,
    audioFileUrl: string,
    key: string,
    name: string
} 

interface DrumMachineProps {
  drums: Drum[]
}

interface DrumProps {
  drum: Drum
  onDrumClick: () => void
}

/**
 * 
 * @todo
 * 1. Why do we have to cleanup with usestate and remove the event listener like this?
 * https://www.pluralsight.com/guides/event-listeners-in-react-components
 * 
 * 2. Find out if possible to share refs between DrumPad and DrumMachine - avoid document.getElementById 
 * 
 */

export default function Home() {
  const drums = [
    {
      id: "4be47b47-ed3e-46cd-80e0-64cbcc957ef8",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      key: "Q",
      name: "Heater 1"
    },    
    {
      id: "a9dc6d5d-5a90-40f2-9aad-96b1a2a29e24",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      key: "W",
      name: "Heater 2"
    },
    {
      id: "06c92b88-f0dc-441b-867b-00efded31e98",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      key: "E",
      name: "Heater 3"
    },    
    {
      id: "565d2d0c-d30d-42da-a9ea-bc047d92f477",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      key: "A",
      name: "Heater 4"
    },    
    {
      id: "bd42c49b-afa8-4492-9f9f-7723c1f63731",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      key: "S",
      name: "Clap"
    },
    {
      id: "dad313e0-5237-4e14-bb40-31a49e4f7a57",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      key: "D",
      name: "Open HH"
    },
    {
      id: "a3c1261a-0bfd-46a8-adb3-12c3506a3338",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      key: "Z",
      name: "Kick 'n' Hat"
    },
    {
      id: "74a6b082-8ee3-4ac0-957a-de5612a1e049",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      key: "X",
      name: "Kick"
    },
    {
      id: "22aa641a-a575-4579-9c4c-f707c67cd858",
      audioFileUrl: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      key: "D",
      name: "Closed HH"
    }
  ]
  return (
    <>
      <AudioRecorder />
      <DrumMachine drums={drums} />
    </>
  )
}

function DrumMachine(props: DrumMachineProps) {

  const { drums } = props

  const [currentDrum, setCurrentDrum] = useState<string | undefined>()

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

function DrumPad(props: DrumProps) {

  const { drum, onDrumClick } = props

  return (
    <div 
    className="drum-pad"
    onClick={(event: React.UIEvent<HTMLDivElement>) => onDrumClick()}
    >
      {drum.key}
      <audio className="clip" id={drum.key} src={drum.audioFileUrl}></audio>
    </div>
  )
}

