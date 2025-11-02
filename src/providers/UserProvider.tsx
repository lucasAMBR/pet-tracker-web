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
	setUser: (user: User) => void;
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

		// <-- FIX: Atualiza o header do axios imediatamente após o login
		api.defaults.headers.authorization = `Bearer ${tokenToStore}`;
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("@tracker_user");
		localStorage.removeItem("@tracker_token");

		// <-- FIX: Limpa o header do axios ao fazer logout
		api.defaults.headers.authorization = null;

		// Opcional: redirecionar aqui é mais seguro
		// window.location.href = '/login';
	}, []);

	useEffect(() => {
		const validateTokenOnLoad = async () => {
			// Pega APENAS o token. O usuário será revalidado.
			const storedToken = localStorage.getItem("@tracker_token");

			if (!storedToken) {
				setLoading(false);
				return;
			}

			try {
				// <-- FIX: Toda a lógica de validação agora está dentro do try/catch

				// 1. Define o header para a chamada de validação
				api.defaults.headers.authorization = `Bearer ${storedToken}`;

				// 2. Busca o usuário (sem 'data' na tipagem por enquanto)
				const response = await api.get("/users/me");

				// 3. (Recomendado) Verifique o que a API está realmente enviando
				console.log("API /me response:", response.data);

				// 4. <-- FIX: Lógica flexível para encontrar os dados do usuário
				// Tenta pegar response.data.data, se não existir, pega response.data
				const userData: User = response.data.data || response.data;

				// 5. Valida se o que veio é um usuário de verdade
				if (!userData || typeof userData.id === "undefined") {
					throw new Error("Invalid user data structure from API");
				}

				// 6. Sucesso! Define o estado e atualiza o localStorage
				setUser(userData);
				setToken(storedToken);
				localStorage.setItem("@tracker_user", JSON.stringify(userData));
			} catch (error) {
				console.error("Token validation failed, logging out:", error);
				logout(); // Se qualquer passo falhar, desloga
			} finally {
				setLoading(false);
			}
		};

		validateTokenOnLoad();
	}, [logout]); // A dependência [logout] está correta

	// Esta lógica agora é 100% confiável
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
			value={{ user, token, isAuthenticated, login, logout, loading, setUser }}
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
