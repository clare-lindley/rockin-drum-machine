import { useState } from "react";
import { DatabaseDrum, DrumMachineProps } from "../types";
import DrumPad from "./DrumPad";
import React from "react";

export default function DrumMachineUI(props: DrumMachineProps) {
  const { drums } = props;

  const [currentDrum, setCurrentDrum] = useState<string | undefined>();

  function playDrumPad(drum: DatabaseDrum) {
    setCurrentDrum(drum.name);
    const audio = document.getElementById(drum.key) as HTMLAudioElement;
    audio.currentTime = 0;
    audio?.play();
  }

  function handleDrumClick(drum: DatabaseDrum) {
    playDrumPad(drum);
  }

  function handleDrumKeyPress(event: KeyboardEvent) {
    const selected = event.key.toUpperCase();
    const drum = drums.find((drum) => drum.key === selected);
    if (drum) {
      playDrumPad(drum);
    }
  }

  function handleTransitionEnd() {
    setCurrentDrum(undefined);
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleDrumKeyPress);
    return () => {
      window.removeEventListener("keydown", handleDrumKeyPress);
    };
  }, [drums]);

  return (
    <main id="drum-machine">
      <div className={`current-drum ${currentDrum ? 'visible' : ''}`}>
        {currentDrum ? currentDrum : ""}
      </div>
      <div className="keys">
        {drums.map((drum) => (
          <DrumPad
            drum={drum}
            key={drum.id}
            onDrumClick={() => handleDrumClick(drum)}
            className={currentDrum === drum.name ? "playing" : ""}
            onTransitionEnd={handleTransitionEnd}
          ></DrumPad>
        ))}
      </div>
    </main>
  );
}
