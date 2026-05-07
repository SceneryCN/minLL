import { motion, useReducedMotion } from "framer-motion";

const BLOBS: Array<{
	className: string;
	animate: Record<string, number[]>;
	duration: number;
}> = [
	{
		className: "site-bg-blob site-bg-blob--a",
		animate: { x: [0, 8, -6, 0], y: [0, -12, 8, 0], scale: [1, 1.08, 1.04, 1] },
		duration: 22,
	},
	{
		className: "site-bg-blob site-bg-blob--b",
		animate: { x: [0, -14, 10, 0], y: [0, 10, -8, 0], scale: [1, 1.12, 1, 1] },
		duration: 28,
	},
	{
		className: "site-bg-blob site-bg-blob--c",
		animate: { x: [0, 18, -12, 0], y: [0, -6, 14, 0], scale: [1.04, 1, 1.1, 1.04] },
		duration: 19,
	},
];

export default function SiteBgMotion() {
	const reducedMotion = useReducedMotion() ?? false;

	if (reducedMotion) {
		return null;
	}

	return (
		<>
			{BLOBS.map((b) => (
				<motion.div
					key={b.className}
					className={b.className}
					aria-hidden
					animate={b.animate}
					transition={{
						duration: b.duration,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
			))}
			<motion.div
				className="site-bg-noise-flicker"
				aria-hidden
				animate={{ opacity: [0.04, 0.09, 0.05, 0.08, 0.04] }}
				transition={{
					duration: 5.5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
		</>
	);
}
