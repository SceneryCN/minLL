import {
	motion,
	useMotionTemplate,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { useMagneticSpring } from "@/hooks/useMagneticSpring";
import { t } from "@/i18n";
import "@/styles/Navbar.css";
import { easeOutExpo } from "@/utils/motion-page";

export default function Navbar() {
	const reducedMotion = useReducedMotion() ?? false;
	const { scrollY } = useScroll();
	const mag = useMagneticSpring(0.45);

	const shellOpaque = useTransform(scrollY, [0, 72], [0, 0.88]);
	const shellBlur = useTransform(scrollY, [0, 72], [0, 24]);
	const rimAlpha = useTransform(scrollY, [0, 72], [0, 0.45]);

	const panelBg = useMotionTemplate`rgba(10, 8, 16, ${shellOpaque})`;
	const panelBlur = useMotionTemplate`blur(${shellBlur}px)`;
	const rimLine = useMotionTemplate`1px solid rgba(212, 175, 55, ${rimAlpha})`;

	return (
		<motion.nav
			className="navbar navbar--minimal"
			initial={reducedMotion ? false : { opacity: 0, y: -32 }}
			animate={{ opacity: 1, y: 0 }}
			transition={
				reducedMotion ? { duration: 0 } : { duration: 0.75, ease: easeOutExpo }
			}
			style={
				reducedMotion
					? undefined
					: {
							backgroundColor: panelBg,
							backdropFilter: panelBlur,
							WebkitBackdropFilter: panelBlur,
							borderBottom: rimLine,
						}
			}
		>
			{!reducedMotion && (
				<motion.div
					className="navbar-sheen"
					aria-hidden
					initial={{ left: "-38%" }}
					animate={{ left: "100%" }}
					transition={{
						duration: 4,
						delay: 0.28,
						ease: [0.4, 0, 0.2, 1],
					}}
				/>
			)}
			<div className="navbar-container">
				<motion.button
					ref={mag.ref}
					type="button"
					className="navbar-logo navbar-logo--text-only"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					onPointerMove={reducedMotion ? undefined : mag.onPointerMove}
					onPointerLeave={reducedMotion ? undefined : mag.onPointerLeave}
					whileHover={reducedMotion ? undefined : { scale: 1.05 }}
					whileTap={reducedMotion ? undefined : { scale: 0.94 }}
					transition={{
						type: "spring",
						stiffness: 480,
						damping: 26,
					}}
				>
					<motion.span
						className="logo-text logo-text--mag"
						style={
							reducedMotion
								? undefined
								: { x: mag.x, y: mag.y, display: "inline-block" }
						}
						initial={
							reducedMotion
								? undefined
								: {
										textShadow: "0 0 6px rgba(212, 175, 55, 0.15)",
										opacity: 0.88,
									}
						}
						animate={
							reducedMotion
								? undefined
								: {
										textShadow:
											"0 0 22px rgba(212, 175, 55, 0.48), 0 0 52px rgba(199, 123, 134, 0.28)",
										opacity: 1,
									}
						}
						transition={{
							duration: 1,
							delay: 0.35,
							ease: easeOutExpo,
						}}
					>
						{t("brand.name")}
					</motion.span>
				</motion.button>
			</div>
		</motion.nav>
	);
}
