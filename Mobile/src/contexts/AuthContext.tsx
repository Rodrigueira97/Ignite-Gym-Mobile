import { ReactNode, createContext, useEffect, useState } from 'react';
import { userDTO } from '@dtos/userDTO';
import { api } from '@services/api';
import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';
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

  async function userAndTokenUpdate(userData: userDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(userData);
  }

  async function signIn(email: string, password: string) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await api.post('/sessions', { email, password });
      setIsLoading(true);

      if (data?.user && data?.token && data?.refresh_token) {
        await storageUserSave(data?.user);
        await storageAuthTokenSave({ refresh_token: data?.refresh_token, token: data?.token });
        setUser(data?.user);
        userAndTokenUpdate(data?.user, data?.token);
      }
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (userLogged && token) {
        setUser(userLogged);
        userAndTokenUpdate(userLogged, token);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptorTokenManager(signUp);

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, isLoading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
