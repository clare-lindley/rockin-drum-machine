// sync.ts

  const syncData = () => {
    // @todoread from IDB where last mod >= localstorage.last_successful_sync_timestamp
    console.log('Syncing data from IDB...')
  };
  
  const startSyncInterval = (intervalDuration: number) => {
    // Set up an interval to call syncData
    const syncInterval = setInterval(() => {
      syncData()
    }, intervalDuration)
  
    // Return a function to stop the interval for use effect to clean up after the component is unmounted
    return () => clearInterval(syncInterval)
  };
  
  export { startSyncInterval }
  