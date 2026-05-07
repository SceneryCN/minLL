import { motion, useReducedMotion } from "framer-motion";

/** Opacity-only: CSS `float` keeps translate; motion must not set transform here */
const ORB_PRESETS = [
	{ className: "gradient-orb orb-1", dur: 13, op: [0.52, 0.72, 0.52] },
	{ className: "gradient-orb orb-2", dur: 16, op: [0.48, 0.68, 0.48] },
	{ className: "gradient-orb orb-3", dur: 11, op: [0.55, 0.78, 0.55] },
] as const;

const FLOAT_SPECS = [
	{ left: "8%", top: "22%", delay: 0, dur: 9 },
	{ left: "78%", top: "18%", delay: 1.2, dur: 11 },
	{ left: "62%", top: "58%", delay: 2.4, dur: 8 },
	{ left: "18%", top: "72%", delay: 0.8, dur: 10 },
	{ left: "88%", top: "68%", delay: 3.1, dur: 12 },
	{ left: "44%", top: "12%", delay: 0.4, dur: 13 },
	{ left: "12%", top: "48%", delay: 2.1, dur: 9 },
	{ left: "92%", top: "38%", delay: 1.6, dur: 11 },
] as const;

export default function HeroAmbient() {
	const reducedMotion = useReducedMotion() ?? false;

	return (
		<>
			{ORB_PRESETS.map((o) => (
				<motion.div
					key={o.className}
					className={o.className}
					animate={
						reducedMotion ? undefined : { opacity: [...o.op] }
					}
					transition={{
						duration: o.dur,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
			))}

			{!reducedMotion &&
				FLOAT_SPECS.map((s, i) => (
					<motion.span
						key={`dust-${i}`}
						className="hero-dust"
						style={{ left: s.left, top: s.top }}
						animate={{
							y: [0, -28, 0],
							opacity: [0.15, 0.55, 0.15],
							scale: [0.85, 1.15, 0.85],
						}}
						transition={{
							duration: s.dur,
							delay: s.delay,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
						aria-hidden
					/>
				))}
		</>
	);
}
