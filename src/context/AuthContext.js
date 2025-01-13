import { createContext, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }
    const logout = () => {
        localStorage.clear();
        setToken(null);
    }
    return <AuthContext.Provider value={{ login, logout, token }}>
        {children}
    </AuthContext.Provider>
}