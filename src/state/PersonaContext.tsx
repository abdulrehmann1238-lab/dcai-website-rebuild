import React, { createContext, useContext, useState, useEffect } from 'react';

export type PersonaType = 'dealer' | 'consultant' | 'owner' | null;

interface PersonaContextType {
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  togglePersona: (p: PersonaType) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<PersonaType>(() => {
    try {
      return (sessionStorage.getItem('dcai_persona') as PersonaType) || null;
    } catch {
      return null;
    }
  });

  const setPersona = (p: PersonaType) => {
    setPersonaState(p);
    try {
      if (p) sessionStorage.setItem('dcai_persona', p);
      else sessionStorage.removeItem('dcai_persona');
    } catch {
      // ignore
    }
  };

  const togglePersona = (p: PersonaType) => {
    setPersona(persona === p ? null : p);
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona, togglePersona }}>
      {children}
    </PersonaContext.Provider>
  );
};

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider');
  return ctx;
}
