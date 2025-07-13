import React, { useState } from 'react';
import {
  ViroNode,
  ViroText,
  ViroBox,
  ViroMaterials,
} from '@reactvision/react-viro';

// Crear materiales una sola vez al cargar el módulo
ViroMaterials.createMaterials({
  hologramMaterial: {
    diffuseColor: '#00ffff',
    lightingModel: 'Lambert',
    metalness: 0.8,
    roughness: 0.2,
  },
  buttonMaterial: {
    diffuseColor: '#0066cc',
    lightingModel: 'Lambert',
  },
});

interface ARLetterProps {
  content: string;
  options: string[];
  position: [number, number, number];
  onResponse: (response: string) => void;
  isActive: boolean;
}

const ARLetter: React.FC<ARLetterProps> = ({
  content,
  options,
  position,
  onResponse,
  isActive,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleLetterTap = () => {
    if (isActive) {
      setShowOptions(true);
    }
  };

  const handleOptionSelect = (option: string) => {
    onResponse(option);
    setShowOptions(false);
  };

  return (
    <ViroNode position={position}>
      {/* Holographic letter background */}
      <ViroBox
        position={[0, 0, 0]}
        scale={[0.8, 1.2, 0.05]}
        materials={['hologramMaterial']}
        onClick={handleLetterTap}
      />

      {/* Letter content */}
      <ViroText
        text={content}
        scale={[0.4, 0.4, 0.4]}
        position={[0, 0, 0.03]}
        fontFamily="Arial"
        fontSize={18}
        color="#00ffff"
        fontWeight="bold"
      />

      {/* Response options */}
      {showOptions && (
        <ViroNode position={[0, -0.8, 0]}>
          {options.map((option, index) => (
            <ViroNode key={index} position={[0, -index * 0.4, 0]}>
              <ViroBox
                position={[0, 0, 0]}
                scale={[0.7, 0.15, 0.05]}
                materials={['buttonMaterial']}
                onClick={() => handleOptionSelect(option)}
              />
              <ViroText
                text={option}
                scale={[0.3, 0.3, 0.3]}
                position={[0, 0, 0.03]}
                fontFamily="Arial"
                fontSize={14}
                color="#ffffff"
              />
            </ViroNode>
          ))}
        </ViroNode>
      )}
    </ViroNode>
  );
};

export default ARLetter; 