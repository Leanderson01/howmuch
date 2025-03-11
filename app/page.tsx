'use client'

import React from 'react';
import SceneController from './components/controllers/SceneController';
import AudioProvider, { AudioControl } from './components/controllers/AudioController';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AudioProvider>
        <AudioControl />
        <SceneController />
      </AudioProvider>
    </main>
  );
}
