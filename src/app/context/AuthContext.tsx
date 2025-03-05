"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
 
interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}
 
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
 
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
 
    const handleSetToken = (newToken: string | null) => {
        console.log("Setting token:", newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
        setToken(newToken);
    };
 
    return (
        <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
};
 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
 