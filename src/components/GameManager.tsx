import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import ARScene from './ARScene';
import { getStoryNode } from '../data/storyData';

interface GameState {
  currentNodeId: string;
  relationshipScore: number;
  choices: string[];
  gameEnded: boolean;
}

const GameManager: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentNodeId: 'start',
    relationshipScore: 0,
    choices: [],
    gameEnded: false,
  });

  const [showAR, setShowAR] = useState(false);

  const currentStoryNode = getStoryNode(gameState.currentNodeId);

  const handleLetterResponse = useCallback((letterId: string, response: string) => {
    if (!currentStoryNode) return;

    const selectedOption = currentStoryNode.options.find(option => option.text === response);
    if (!selectedOption) return;

    const newChoices = [...gameState.choices, response];
    const newRelationshipScore = gameState.relationshipScore + selectedOption.relationshipChange;

    setGameState(prev => ({
      ...prev,
      currentNodeId: selectedOption.nextNodeId,
      relationshipScore: newRelationshipScore,
      choices: newChoices,
      gameEnded: selectedOption.nextNodeId === 'credits' || selectedOption.nextNodeId === 'ending_abandon',
    }));

    // Show relationship feedback
    if (selectedOption.relationshipChange > 0) {
      Alert.alert('Zhur se siente más conectado contigo');
    } else if (selectedOption.relationshipChange < 0) {
      Alert.alert('Zhur se siente distante');
    }
  }, [currentStoryNode, gameState.choices, gameState.relationshipScore]);

  const resetGame = useCallback(() => {
    setGameState({
      currentNodeId: 'start',
      relationshipScore: 0,
      choices: [],
      gameEnded: false,
    });
    setShowAR(false);
  }, []);

  const getEndingMessage = useCallback(() => {
    if (gameState.relationshipScore >= 5) {
      return 'Final Feliz: Zhur y tú lograron recordar su conexión y regresar juntos a casa.';
    } else if (gameState.relationshipScore >= 0) {
      return 'Final Neutral: Zhur logró salir, pero la conexión entre ustedes se perdió en el espacio.';
    } else {
      return 'Final Triste: Zhur se perdió para siempre en el vacío del espacio.';
    }
  }, [gameState.relationshipScore]);

  if (!currentStoryNode) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No se encontró el nodo de historia</Text>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (gameState.gameEnded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cartas del Espacio</Text>
        <Text style={styles.endingText}>{getEndingMessage()}</Text>
        <Text style={styles.scoreText}>Puntuación de relación: {gameState.relationshipScore}</Text>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Jugar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!showAR) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cartas del Espacio</Text>
        <Text style={styles.subtitle}>Una historia de conexión interestelar</Text>
        <Text style={styles.description}>
          Recibes una carta flotante en RA, escrita por un alien solitario llamado Zhur, 
          atrapado en una estación abandonada. Tus decisiones afectan su destino.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowAR(true)}>
          <Text style={styles.buttonText}>Comenzar Aventura</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: () => (
          <ARScene 
            onLetterResponse={handleLetterResponse} 
            currentNodeId={gameState.currentNodeId}
          />
        ),
      }}
      style={styles.arContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  arContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endingText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  scoreText: {
    fontSize: 16,
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default GameManager; 