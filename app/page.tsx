"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import db from "@/utils/dexieDB";
import DrumMachineUI from "./components/DrumMachine";
import { DatabaseDrum } from "./types";


export default function HomePage() {

  const [drums, setDrums] = useState<DatabaseDrum[] | null>(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await db.drums.where({'drumMachineId': 3}).toArray() as DatabaseDrum[]
              if (result) {
                  setDrums(result);
                  console.log(result)
              } else {
                  // Handle the case when the record is not found
                  console.log('NO RESULT')
              }
          } catch (error) {
              console.error('Error fetching drums:', error);
              // Handle the error accordingly
          }
      };

      fetchData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <>
     {drums && (
      <>
      <h1>Here is the latest Drum Machine!</h1>
      <ul>{drums.map((drum) =>  <li key={drum.audioFileUrl}>{drum.name}</li>)}</ul>
      <DrumMachineUI drums={drums}/>
      </>
     )}

    <p>Some links for you:</p>
    <ul className="homepage-links">
      <li><Link href={`/create-drum-machine/`}>Create your own Drum Machine!</Link></li>
      <li><Link href={`/page-1/`}>Here's another page</Link></li>
      <li><Link href={`/page-2`}>And another</Link></li>
    </ul>
    </>
  )
}





