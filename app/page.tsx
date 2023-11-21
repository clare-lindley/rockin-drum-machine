"use client"

import React, { useEffect, useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import DrumMachine from "./components/DrumMachine";
import db from '@/utils/dexieDB';
import { Drum } from "./types";

export default function Home() {

  const [drums, setDrums] = useState<Drum[] | undefined>();

  const fetchDrums = async () => {
    const drums: Drum[] = await db.drums.toArray();
    setDrums(drums);
  };

  useEffect(() => {
    fetchDrums();
  }, []);

  return (
    <>
      <AudioRecorder />
      {drums &&
        <DrumMachine drums={drums} />
      }
    </>
  )
}





