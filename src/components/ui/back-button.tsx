// components/BackButton.tsx (Versão Final e Simplificada)
"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type BackButtonProps = {
    fallbackPath?: string,
    isFixed?: boolean
}

const BackButton = ({ fallbackPath = '/', isFixed = false }: BackButtonProps) => {
    const router = useRouter();

    const handleBack = () => {
        /**
         * A fonte da verdade para o histórico de navegação é o próprio navegador.
         * Esta lógica verifica se há para onde voltar *dentro da aba atual*.
         *
         * - Se `window.history.length > 2`, significa que o usuário navegou de
         * pelo menos uma outra página DENTRO do nosso site para chegar aqui.
         * Nesse caso, `router.back()` é seguro.
         *
         * - Se `window.history.length <= 2`, o usuário provavelmente acessou esta
         * página diretamente. Usamos `router.replace(fallbackPath)` para
         * substituir a entrada "morta" do histórico pela página de fallback.
         */
        if (window.history.length > 2) {
            router.back();
        } else {
            router.replace(fallbackPath);
        }
    }

    return (
        <div 
            className={`rounded-md flex items-center justify-center
                bg-neutral-900 hover:bg-neutral-700 text-white 
                dark:bg-white dark:hover:bg-neutral-300 dark:text-black
                ${isFixed ? "fixed top-0 left-0 m-6" : ""} p-2 cursor-pointer`}
            onClick={handleBack}
        >
            <ChevronLeft />
        </div>
    )
}

export default BackButton;