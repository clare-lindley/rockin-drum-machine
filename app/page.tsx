"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import db from "@/utils/dexieDB";
import DrumMachineUI from "./components/DrumMachine";
import { DatabaseDrum } from "./types";
import testDrums from "../utils/spikes/testData";

/**
 * 
 * Add a createdAt timestamp field to the Drum Machine and the Drum
 * Insert current time (the same one) for the new Drums and Drum Machine
 * db schema
 * 
 * Select drums with the most recent date:
 * 
 * 
 *  // Utilize index for sorting. Filter manually. Can be the best when a limit is used.
  const latestDrums = await db.drums
    .orderBy('createdAt')
    .limit(1)
ADD index on createdAt

// OK issues
// we need to read the latest DRUM machine and then do a join to get the drums!

 */

export default function HomePage() {

  const [drums, setDrums] = useState<DatabaseDrum[] | null>(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              // Ugh type coercion here SAD FACE ;-( TS doesn't know what version of 'Drum' we are using here
              const latestDrums = await db.drums.orderBy('createdAt').limit(1).reverse().toArray() as DatabaseDrum[]

              if(latestDrums && latestDrums.length > 0){
                console.log({latestDrums})
                setDrums(latestDrums);
              }
              else {
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
     {(drums && drums.length > 0) && (
      <>
      <h1>Here is the latest Drum Machine from Indexed DB!</h1>
      <DrumMachineUI drums={drums}/>
      </>
     )}

{/*     {testDrums && (
      <>
      <h1>Here is a hardcoded Drum Machine with test drums hosted on AWS!</h1>
      <DrumMachineUI drums={testDrums}/>
      </> NOTE won't work as doesn't have a blob 
     )} */}

    <p>Some links for you:</p>
    <ul className="homepage-links">
      <li><Link href={`/create-drum-machine/`}>Create your own Drum Machine!</Link></li>
      <li><Link href={`/page-1/`}>Here's another page</Link></li>
      <li><Link href={`/page-2`}>And another</Link></li>
    </ul>
    </>
  )
}





