"use client"

import React from "react";
import Link from "next/link";
import DrumMachineUI from "./components/DrumMachine";
import testDrums from "../utils/spikes/testData";

export default function HomePage() {

  return (
    <>
     {testDrums && (
      <>
      <h1>Here is a hardcoded Drum Machine with test drums hosted on AWS!</h1>
      <div>
        <Link href={`/create-drum-machine/`}>Create your own Drum Machine!</Link>
      </div>
      <DrumMachineUI drums={testDrums}/>
      </> 
     )} 
    </>
  )
}





