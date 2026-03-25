import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { LocalUser, getUser, saveUser, removeUser } from '@/lib/localStorage';

interface AuthContextType {
  user: LocalUser | null;
  signIn: (email: string, firstName: string, lastName: string) => void;
  signUp: (email: string, firstName: string, lastName: string) => void;
  signOut: () => void;
  updateProfile: (firstName: string, lastName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(getUser);

  const signIn = useCallback((email: string, firstName: string, lastName: string) => {
    const existing = getUser();
    if (existing && existing.email === email) {
      setUser(existing);
      return;
    }
    const newUser: LocalUser = {
      id: crypto.randomUUID(),
      email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);
    setUser(newUser);
  }, []);

  const signUp = signIn; // same behavior for local auth

  const signOut = useCallback(() => {
    removeUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback((firstName: string, lastName: string) => {
    if (!user) return;
    const updated = { ...user, firstName, lastName };
    saveUser(updated);
    setUser(updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
