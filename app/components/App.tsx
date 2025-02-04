"use client"

import React from 'react';
import useSync from '@/hooks/useSync';

const App = ({ children }: { children: React.ReactNode }) => {
  useSync();

  return (
    <>
      {children}
    </>
  );
};

export default App;
