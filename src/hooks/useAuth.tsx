import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "src/constants";
import { useSessionStorage } from "./useSessionStorage";
const AuthContext = createContext({
  accessToken: "",
  login: (data, callback) => {},
  logout: (callback) => {},
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useSessionStorage("token", null);

  const login = async (data, callback) => {
    setAccessToken(data);
    callback && callback();
  };

  const logout = (callback) => {
    setAccessToken(null);
    callback && callback();
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth: any = (): any => {
  return useContext(AuthContext);
};

export default AuthContext;
