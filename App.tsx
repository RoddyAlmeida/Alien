/**
 * Cartas del Espacio - AR Game
 * A branching narrative game with AR letters
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import GameManager from './src/components/GameManager';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GameManager />
    </>
  );
}

export default App;
