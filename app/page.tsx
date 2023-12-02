"use client"

import React from "react";
import AudioRecorder from "./components/AudioRecorderV2";
import Link from "next/link";

/**
 * app/page.tsx = the UI for the route '/' ie the homepage
 */
export default function Home() {

  return (
    <ul>
      <li><Link href={`/create-drum-machine/`}>Create your own Drum Machine!</Link></li>
      <li><Link href={`/page-1/`}>Here's another page</Link></li>
      <li><Link href={`/page-2`}>And another</Link></li>
    </ul>
  )
}





