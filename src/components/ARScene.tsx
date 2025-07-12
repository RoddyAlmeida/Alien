import React, { useMemo, useEffect } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  ViroNode,
} from '@viro-community/react-viro';
import { StyleSheet } from 'react-native';
import ARLetter from './ARLetter';
import { getStoryNode } from '../data/storyData';

interface ARSceneProps {
  onLetterResponse: (letterId: string, response: string) => void;
  currentNodeId?: string;
}

const ARScene: React.FC<ARSceneProps> = ({ onLetterResponse, currentNodeId = 'start' }) => {
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

  useEffect(() => {
    ViroMaterials.createMaterials({
      particleMaterial: {
        diffuseColor: '#ffffff',
        lightingModel: 'PBR',
      },
    });
  }, []);

  if (!currentStoryNode) {
    return (
      <ViroARScene>
        <ViroNode position={[0, 0, -1]}>
          <ViroText
            text="Error: No se encontró la carta"
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, 0]}
            style={styles.errorText}
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

const styles = StyleSheet.create({
  errorText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#ff0000',
    textAlignVertical: 'center',
  },
});

export default ARScene; 