"use client";

import React from "react";
import Link from "next/link";
import DrumMachineUI from "./components/DrumMachine";
import testDrums from "../utils/spikes/testData";

export default function HomePage() {
  /*  
debug to check: is what I am uploading from Chrome in MacOS supported by the MediaRecorder?
const types = [
    "video/webm",
    "audio/webm",
    "video/webm;codecs=vp8",
    "video/webm;codecs=daala",
    "video/webm;codecs=h264",
    "audio/webm;codecs=opus",
    "video/mpeg",
    "audio/mp4",
    "audio/mpeg",
  ];
  
  for (const type of types) {
    console.log(
      `Is ${type} supported? ${
        MediaRecorder.isTypeSupported(type) ? "Maybe!" : "Nope :("
      }`,
    );
  } */

  return (
    <>
      {testDrums && (
        <>
          <div className="intro">
            <h1>Rockin' Drum Machine!</h1>
            <Link href={`/create-drum-machine/`} className="button-link">
              Create your own Drum Machine!
            </Link>
          </div>
          <DrumMachineUI drums={testDrums} />
        </>
      )}
    </>
  );
}
