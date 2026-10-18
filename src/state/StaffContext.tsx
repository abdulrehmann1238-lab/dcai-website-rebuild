import React, { createContext, useContext, useState, useEffect } from 'react';

interface StaffContextType {
  isBlockMapActive: boolean;
  setBlockMapActive: (active: boolean) => void;
  toggleBlockMap: () => void;
  isTourActive: boolean;
  startTour: () => void;
  endTour: () => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBlockMapActive, setBlockMapActiveState] = useState(false);
  const [isTourActive, setTourActive] = useState(false);

  const setBlockMapActive = (active: boolean) => {
    setBlockMapActiveState(active);
    if (active) {
      document.body.classList.add('block-map-active');
    } else {
      document.body.classList.remove('block-map-active');
    }
  };

  const toggleBlockMap = () => {
    setBlockMapActive(!isBlockMapActive);
  };

  const startTour = () => setTourActive(true);
  const endTour = () => setTourActive(false);

  useEffect(() => {
    return () => {
      document.body.classList.remove('block-map-active');
    };
  }, []);

  return (
    <StaffContext.Provider
      value={{
        isBlockMapActive,
        setBlockMapActive,
        toggleBlockMap,
        isTourActive,
        startTour,
        endTour
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export function useStaff() {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaff must be used within StaffProvider');
  return ctx;
}
