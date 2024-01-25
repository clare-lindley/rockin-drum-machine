// syncUtils.js

const syncData = () => {
    // read from IDB where last mod >= localstorage.last_successful_sync_timestamp
    console.log('Syncing data...')
  };
  
  const startSyncInterval = (intervalDuration: number) => {
    // Set up an interval to call syncData
    const syncInterval = setInterval(() => {
      syncData()
    }, intervalDuration)
  
    // Return a function to stop the interval
    return () => clearInterval(syncInterval)
  };
  
  export { syncData, startSyncInterval }
  