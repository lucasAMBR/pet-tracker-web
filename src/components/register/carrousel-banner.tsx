import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contentData = [
	{
		image: "/images/register_banner.jpg",
		title: "Segurança Total",
		description:
			"Com nosso rastreador GPS, você acompanha cada passo do seu melhor amigo em tempo real. A tranquilidade de saber que ele está seguro não tem preço. Nunca mais passe pelo desespero de um pet perdido",
	},
	{
		image: "/images/register_banner_2.jpg",
		title: "Cuidado e Organização na Palma da Mão",
		description:
			"Centralize todo o histórico de saúde, vacinas e documentos do seu pet em um só lugar. Acesse facilmente as informações em consultas veterinárias ou emergências. A gestão da vida do seu bichinho nunca foi tão simples!",
	},
	{
		image: "/images/register_banner_3.jpg",
		title: "A Solução Completa Para Seu Pet",
		description:
			"O Pet Tracker une a segurança do rastreamento em tempo real com a praticidade da documentação digital. Viaje, passeie e cuide do seu pet com a certeza de que tem tudo sob controle. A ferramenta definitiva para o tutor moderno.",
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
