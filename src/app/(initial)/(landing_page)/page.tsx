"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "./_components/navbar"
import BlurText from "./_components/blurText";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="w-screen h-screen bg-[url('/images/banner.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="w-full h-full bg-black/30 flex items-center justify-center">
          <div className="w-full max-w-[1280px]">
            <BlurText
              text="Never leave your pet out of sight"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="text-5xl font-semibold max-w-[500px] text-white"
            />
            <BlurText
              text="Security, reliability and monitoring, with pet tracker you never take your eyes off your pet"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="text-xl max-w-[500px] text-white mt-3"
            />
            <Button asChild variant={"outline"} size={'lg'} className="mt-4">
              <motion.button
                initial={{
                  opacity: 0,           // Começa invisível
                  y: 30,                // Começa 20px abaixo da posição final
                  filter: 'blur(20px)'   // Começa com 5px de desfoque
                }}
                // 2. Estado final (animado)
                animate={{
                  opacity: 1,           // Se torna totalmente visível
                  y: 0,                 // Sobe para a posição final (0px de deslocamento)
                  filter: 'blur(0px)'   // Remove o desfoque
                }}
                // 3. Transição
                transition={{
                  duration: 1.2,
                  ease: "linear"      // Dura 0.8 segundos
                }}

                className="bg-transparent text-white cursor-pointer"
              >Know more about the project</motion.button>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
