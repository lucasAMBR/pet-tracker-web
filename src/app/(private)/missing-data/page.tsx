"use client"

import { useAuth } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MissingDataPage = () => {

    const router = useRouter();

    const { isAuthenticated, user, loading} = useAuth();
    
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return null;
    }

    return(
        <p>Olá, bem vindo {user?.name}</p>
    )
}

export default MissingDataPage;