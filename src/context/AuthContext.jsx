import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "../reducer/AuthReducer";

const INITIAL_STATE = {
  user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', state.token);
    localStorage.setItem('role', state.role);
  }, [state])

  return (
    <AuthContext.Provider
      value={{ user: state.user, role: state.role, token: state.token, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
