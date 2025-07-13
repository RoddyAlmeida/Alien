import React, { useMemo } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  ViroNode,
} from '@reactvision/react-viro';
import ARLetter from './ARLetter';
import { getStoryNode } from '../data/storyData';
import { useGame } from '../context/GameContext';

interface ARSceneProps {
  sceneNavigator?: any;
}

// Crear materiales una sola vez
ViroMaterials.createMaterials({
  particleMaterial: {
    diffuseColor: '#ffffff',
    lightingModel: 'Lambert',
  },
});

const ARScene: React.FC<ARSceneProps> = (_props) => {
  const gameContext = useGame();
  const { onLetterResponse, currentNodeId } = gameContext;
  const currentStoryNode = getStoryNode(currentNodeId);

  // Generate particles once and memoize them
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, index) => ({
      id: index,
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      ] as [number, number, number]
    }));
  }, []);

  if (!currentStoryNode) {
    return (
      <ViroARScene>
        <ViroNode position={[0, 0, -1]}>
          <ViroText
            text="Error: No se encontró la carta"
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, 0]}
            fontFamily="Arial"
            fontSize={16}
            color="#ff0000"
          />
        </ViroNode>
      </ViroARScene>
    );
  }

  return (
    <ViroARScene>
      {/* Floating letter hologram */}
      <ARLetter
        content={currentStoryNode.content}
        options={currentStoryNode.options.map(option => option.text)}
        position={[0, 0, -1]}
        onResponse={(response) => {
          const selectedOption = currentStoryNode.options.find(option => option.text === response);
          if (selectedOption) {
            onLetterResponse(currentStoryNode.id, response);
          }
        }}
        isActive={true}
      />

      {/* Ambient space particles */}
      <ViroNode position={[0, 0, -2]}>
        {particles.map((particle) => (
          <ViroBox
            key={particle.id}
            position={particle.position}
            scale={[0.02, 0.02, 0.02]}
            materials={['particleMaterial']}
          />
        ))}
      </ViroNode>
    </ViroARScene>
  );
};

export default ARScene; 