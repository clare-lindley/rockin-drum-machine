"use client";

import { useEffect } from "react";
import { startSyncInterval } from "@/utils/sync";

const useSync = () => {
  const interval: number = 1000;
  useEffect(()=>{
    // This effect runs only once when the component mounts
    const stopSync = startSyncInterval(interval);
    return stopSync;
  }, []); // Empty dependency array ensures it runs only once
};

export default useSync;
