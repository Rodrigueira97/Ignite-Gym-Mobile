import { userDTO } from "@dtos/userDTO";
import { ReactNode, createContext, useState } from "react";

interface PropsAuthContext {
  user: userDTO;
}

interface PropsProvider {
  children: ReactNode;
}

export const AuthContext = createContext<PropsAuthContext>(
  {} as PropsAuthContext
);

export function AuthContextProvider({ children }: PropsProvider) {
  const [user, setUser] = useState({
    id: "1",
    name: "Rodrigo",
    email: "rodrigoxc97@hotmail.com",
    avatar: "rodrigo.png",
  });

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
}
