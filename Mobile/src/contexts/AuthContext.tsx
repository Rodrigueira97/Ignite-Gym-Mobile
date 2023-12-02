import { ReactNode, createContext, useState } from 'react';
import { userDTO } from '@dtos/userDTO';
import { api } from '@services/api';

interface PropsAuthContext {
  user: userDTO;
  setUser: React.Dispatch<React.SetStateAction<userDTO>>;
  signIn: (email: string, password: string) => Promise<void>;
}

interface PropsProvider {
  children: ReactNode;
}

export const AuthContext = createContext<PropsAuthContext>({} as PropsAuthContext);

export function AuthContextProvider({ children }: PropsProvider) {
  const [user, setUser] = useState<userDTO>({} as userDTO);

  async function signIn(email: string, password: string) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data?.user) {
        setUser(data?.user);
      }
    } catch (error) {
      throw error;
    }
  }

  return <AuthContext.Provider value={{ user, setUser, signIn }}>{children}</AuthContext.Provider>;
}
