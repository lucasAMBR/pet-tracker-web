// app/contexts/NavigationContext.tsx
"use client";

import { usePathname } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type NavigationContextType = {
  history: string[];
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory((prevHistory) => {
      if (prevHistory[prevHistory.length - 1] === pathname) {
        return prevHistory;
      }
      return [...prevHistory, pathname];
    });
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ history }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};