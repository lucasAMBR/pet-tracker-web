"use client"

import FuzzyText from "@/components/NotFound/FuzzyText";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {

    const router = useRouter();

    const { isDark } = useTheme();

    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <FuzzyText baseIntensity={0.2} hoverIntensity={0.4} enableHover={true} color={isDark ? "#FFF" : "#000"}>
                404
            </FuzzyText>
            <p className="text-4xl font-bold my-12 text-center">It looks like the page you are <br /> looking for does not exist.</p>
            <Button 
                className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-300 text-white dark:text-black cursor-pointer"
                size={"lg"}
                onClick={() => router.push("/")}
            >
                Back to home
            </Button>
        </div>
    )
}

export default NotFoundPage;