"use client"

import React from "react";
import ReactHookForm from "../components/ReactHookForm";
import UseFetchHookExample from "../components/UseFetchHookExample";
import UseLocalStorageHookExample from "../components/UseLocalStorageHookExample";

/**
 * SPIKE 2!  use app router to create the ‘create-drum-machine’ page.   ✅ 
 * app/create-drum-machine/page.tsx = the UI for the route '/create-drum-machine' ie the Create Drum Machine page
 */
export default function CreateDrumMachine() {

  return (
    <>
     <h1>Create Drum Machine</h1>
     <ReactHookForm />
     <UseFetchHookExample />
     <UseLocalStorageHookExample />
    </>
  )
}





