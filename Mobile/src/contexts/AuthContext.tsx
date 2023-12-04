import { ReactNode, createContext, useEffect, useState } from 'react';
import { userDTO } from '@dtos/userDTO';
import { api } from '@services/api';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

interface PropsAuthContext {
  user: userDTO;
  setUser: React.Dispatch<React.SetStateAction<userDTO>>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: () => void;
  isLoading: boolean;
}

interface PropsProvider {
  children: ReactNode;
}

export const AuthContext = createContext<PropsAuthContext>({} as PropsAuthContext);

export function AuthContextProvider({ children }: PropsProvider) {
  const [user, setUser] = useState<userDTO>({} as userDTO);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn(email: string, password: string) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data?.user) {
        storageUserSave(data?.user);
        setUser(data?.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signUp() {
    try {
      setIsLoading(true);
      setUser({} as userDTO);
      await storageUserRemove();
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, isLoading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
