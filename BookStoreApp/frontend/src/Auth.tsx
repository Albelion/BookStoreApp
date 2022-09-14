import React from 'react';
import { useState, useEffect } from 'react';
import SessionManager from './SessionManager';
import { AuthorizedUserData, postLoginDataAsync } from './Data/BookData';
import { UserSessionData } from './SessionManager';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { AuthorizedUserData } from './Data/BookData';
const notifyErrorLogin = () => {
  toast.error('Неверный email или пароль', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

interface IAuthContext {
  isAuthenticated: boolean;
  user?: UserSessionData;
  signIn: (loginData: FormData) => Promise<AuthorizedUserData | null>;
  signOut: () => void;
  loading: boolean;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  signIn: async (loginData: FormData): Promise<AuthorizedUserData | null> =>
    null,
  signOut: () => {},
  loading: true,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserSessionData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(() => true);
      const isTokenExist = SessionManager.getToken() ? true : false;
      if (isTokenExist) {
        const sessionUser = SessionManager.getUser();
        setUser(() => sessionUser);
      }
      setIsAuthenticated(() => isTokenExist);
      setLoading(() => false);
    };
    initAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn: async (
          loginData: FormData,
        ): Promise<AuthorizedUserData | null> => {
          const result = await postLoginDataAsync(loginData);
          if (result) {
            SessionManager.setUserSession(
              result.email,
              result.token,
              result.userId,
              result.role,
            );
            setIsAuthenticated(() => true);
            setUser(() => SessionManager.getUser());
            return result;
          } else {
            notifyErrorLogin();
            return null;
          }
        },
        signOut: () => {
          SessionManager.removeUserSession();
          setIsAuthenticated(() => false);
        },
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
