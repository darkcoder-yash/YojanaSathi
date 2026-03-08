import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  annualIncome: string;
  occupation: string;
  category: string;
}

export interface AppliedScheme {
  schemeId: string;
  schemeName: string;
  appliedDate: string;
  status: 'completed' | 'current' | 'pending';
  applicationId: string;
}

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  isGuest: boolean;
  setIsGuest: (guest: boolean) => void;
  appliedSchemes: AppliedScheme[];
  applyForScheme: (scheme: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [appliedSchemes, setAppliedSchemes] = useState<AppliedScheme[]>([]);

  const applyForScheme = (scheme: any) => {
    const newApplication: AppliedScheme = {
      schemeId: scheme.id,
      schemeName: scheme.name,
      appliedDate: new Date().toLocaleDateString(),
      status: 'current',
      applicationId: `YS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
    };
    setAppliedSchemes(prev => [...prev, newApplication]);
  };

  return (
    <AppContext.Provider
      value={{ 
        language, 
        setLanguage, 
        userProfile, 
        setUserProfile, 
        isGuest, 
        setIsGuest,
        appliedSchemes,
        applyForScheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
