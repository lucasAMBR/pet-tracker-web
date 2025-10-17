import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contentData = [
	{
		image: "/images/register_banner.jpg",
		title: "Total Security",
		description:
			"With our GPS tracker, you can follow your best friend's every step in real time. The peace of mind of knowing they are safe is priceless. Never go through the despair of a lost pet again.",
	},
	{
		image: "/images/register_banner_2.jpg",
		title: "Care and Organization in the Palm of Your Hand",
		description:
			"Centralize your pet's entire health history, vaccinations, and documents in one place. Easily access information during veterinary appointments or emergencies. Managing your pet's life has never been so simple!",
	},
	{
		image: "/images/register_banner_3.jpg",
		title: "The Complete Solution For Your Pet",
		description:
			"The Pet Tracker combines the security of real-time tracking with the convenience of digital documentation. Travel, walk, and care for your pet with the certainty that you have everything under control. The definitive tool for the modern pet owner.",
	},
];

const textContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
	exit: { opacity: 0, transition: { duration: 0.5 } },
} as const;

const textItemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: "spring", stiffness: 100 },
	},
} as const;

const CarrouselBanner = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % contentData.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const { image, title, description } = contentData[currentIndex];

	return (
		<div className="relative h-full w-full flex-1 rounded-3xl overflow-hidden bg-black">
			<AnimatePresence>
				<motion.div
					key={currentIndex}
					className="absolute inset-0 h-full w-full bg-cover bg-center"
					style={{ backgroundImage: `url(${image})` }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1, ease: "easeInOut" }}
				/>
			</AnimatePresence>

			<div className="relative w-full h-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-16">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						className="border-l border-white pl-3"
						variants={textContainerVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<motion.h3
							className="text-3xl mb-4 text-white font-semibold"
							variants={textItemVariants}
						>
							{title}
						</motion.h3>
						<motion.p
							className="max-w-[400px] text-white"
							variants={textItemVariants}
						>
							{description}
						</motion.p>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default CarrouselBanner;
