"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "../../../components/landing_page/navbar";
import BlurText from "../../../components/landing_page/blur-text";

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
						<Button asChild variant={"outline"} size={"lg"} className="mt-4">
							<motion.button
								initial={{
									opacity: 0,
									y: 30,
									filter: "blur(20px)",
								}}
								animate={{
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
								}}
								transition={{
									duration: 1.2,
									ease: "linear",
								}}
								className="bg-transparent text-white cursor-pointer"
							>
								Know more about the project
							</motion.button>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
