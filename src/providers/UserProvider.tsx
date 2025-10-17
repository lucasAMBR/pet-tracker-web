"use client";

import { api } from "@/lib/axios";
import { LoginResponse } from "@/types/LoginResponse/LoginResponse";
import { User } from "@/types/User/User";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

import { Spinner } from "@/components/ui/spinner"; 

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: LoginResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const login = useCallback((data: LoginResponse) => {
        const userToStore = data.user;
        const tokenToStore = data.token;

        setUser(userToStore);
        setToken(tokenToStore);

        localStorage.setItem("@tracker_user", JSON.stringify(userToStore));
        localStorage.setItem("@tracker_token", tokenToStore);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("@tracker_user");
        localStorage.removeItem("@tracker_token");
        // window.location.href = '/login';
    }, []);

    useEffect(() => {
        const validateTokenOnLoad = async () => {
            const storedToken = localStorage.getItem("@tracker_token");
            const storedUser = localStorage.getItem("@tracker_user");

            if (!storedToken || !storedUser) {
                setLoading(false);
                return;
            }
            setUser(JSON.parse(storedUser));
            setToken(storedToken);

            try {
                api.defaults.headers.authorization = `Bearer ${storedToken}`;
                const response = await api.get<{ data: User }>("/user/me");

                setUser(response.data.data);
                localStorage.setItem("@tracker_user", JSON.stringify(response.data.data));

            } catch (error) {
                console.error("Token validation failed, logging out:", error);
                logout(); 
            } finally {
                setLoading(false);
            }
        };

        validateTokenOnLoad();
    }, [logout]);

    const isAuthenticated = !loading && !!user && !!token;

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};