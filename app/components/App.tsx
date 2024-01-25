"use client"

import { startSyncInterval } from '@/utils/sync';
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Start syncing data every 5 minutes
    const stopSync = startSyncInterval(1000)

    // Clean up the interval when the component unmounts or changes
    return stopSync
  }, [])

  return false

}

export default App