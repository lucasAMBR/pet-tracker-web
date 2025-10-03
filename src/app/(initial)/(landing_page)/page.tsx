import { Button } from "@/components/ui/button";
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
            <div>
              <Button className="bg-transparent border border-white mt-4 cursor-pointer hover:bg-white hover:text-cyan-600">Know more about the project</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
