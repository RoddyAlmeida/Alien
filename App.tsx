/**
 * Cartas del Espacio - AR Game
 * A branching narrative game with AR letters
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import GameManager from './src/components/GameManager';
import { GameProvider } from './src/context/GameContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GameProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GameManager />
    </GameProvider>
  );
}

export default App;
