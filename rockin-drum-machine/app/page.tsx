"use client"

import React, { useEffect, useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import DrumMachine from "./components/DrumMachine";
import drums from "@/utils/testData";





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

  return (
    <>
      <AudioRecorder />
      <DrumMachine drums={drums} />
    </>
  )
}





