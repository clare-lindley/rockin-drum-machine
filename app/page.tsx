"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import db from "@/utils/dexieDB";
import DrumMachineUI from "./components/DrumMachine";
import { DatabaseDrum, DatabaseDrumMachine } from "./types";
import testDrums from "../utils/spikes/testData";

export default function HomePage() {

  const [drumMachine, setdrumMachine] = useState<Omit<DatabaseDrumMachine, 'id' | 'createdAt'> | null>(null);

  useEffect(() => {
      const fetchData = async () => {
           try {
              // @todo don't like type coercion here but TS doesn't know what version of 'Drum' we are using if I don't do it
              const [latestDrumMachine] = await db.drumMachines.orderBy('createdAt').limit(1).reverse().toArray() as DatabaseDrumMachine[]
              if(latestDrumMachine){
                
                const latestDrums = await db.drums.where({drumMachineId: latestDrumMachine.id}).toArray() as DatabaseDrum[]
                setdrumMachine(
                  latestDrums && latestDrums.length > 0
                    ? { name: latestDrumMachine.name, drums: latestDrums }
                    : (() => {
                        console.log(`Can't get latest drums`);
                        return drumMachine; // Assuming you want to keep the existing drumMachine in case of failure
                      })()
                );
                
              }
              else {
                console.log(`Can't get latest drum machine`)
              }

          } catch (error) {
              console.error('Error fetching drums:', error);
          } 

      };

      fetchData();
  }, []); // Empty dependency array - run this effect only once when the component mounts

  return (
    <>
     {(drumMachine) && (
      <>
      <h1>Here is the latest Drum Machine: <span className="dm-title">'{drumMachine.name}'</span></h1>
      <DrumMachineUI drums={drumMachine.drums}/>
      </>
     )}

{/*     {testDrums && (
      <>
      <h1>Here is a hardcoded Drum Machine with test drums hosted on AWS!</h1>
      <DrumMachineUI drums={testDrums}/>
      </> NOTE won't work as doesn't have a blob 
     )} */}

    <div>
      <Link href={`/create-drum-machine/`}>Create your own Drum Machine!</Link>
    </div>

    </>
  )
}





