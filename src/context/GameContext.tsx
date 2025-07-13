import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  currentNodeId: string;
  relationshipScore: number;
  choices: string[];
  gameEnded: boolean;
  onLetterResponse: (letterId: string, response: string) => void;
  setGameData: (data: Partial<GameContextType>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameData, setGameDataState] = useState({
    currentNodeId: 'start',
    relationshipScore: 0,
    choices: [] as string[],
    gameEnded: false,
  });

  const [onLetterResponseCallback, setOnLetterResponseCallback] = useState<
    (letterId: string, response: string) => void
  >(() => () => {});

  const setGameData = (data: Partial<GameContextType>) => {
    if (data.onLetterResponse) {
      setOnLetterResponseCallback(() => data.onLetterResponse!);
    }
    setGameDataState(prev => ({ ...prev, ...data }));
  };

  const value: GameContextType = {
    ...gameData,
    onLetterResponse: onLetterResponseCallback,
    setGameData,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
