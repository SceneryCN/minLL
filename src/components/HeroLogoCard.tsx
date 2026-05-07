import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { BRAND_LOGO_SRC } from "@/constants/assets";

const POINTER_TILT_X = 26;
const POINTER_TILT_Y = 32;

const FRAME_SHADOW_KEYS = [
	"0 0 48px rgba(212, 175, 55, 0.22), 0 24px 64px rgba(8, 4, 14, 0.55), inset 0 0 0 1px rgba(248, 232, 188, 0.12)",
	"0 0 72px rgba(212, 175, 55, 0.42), 0 28px 76px rgba(125, 90, 130, 0.22), inset 0 0 0 1px rgba(248, 232, 188, 0.22)",
	"0 0 52px rgba(199, 123, 134, 0.35), 0 22px 60px rgba(8, 4, 14, 0.55), inset 0 0 0 1px rgba(248, 232, 188, 0.14)",
	"0 0 48px rgba(212, 175, 55, 0.22), 0 24px 64px rgba(8, 4, 14, 0.55), inset 0 0 0 1px rgba(248, 232, 188, 0.12)",
] as const;

export default function HeroLogoCard() {
	const reducedMotion = useReducedMotion() ?? false;
	const wrapRef = useRef<HTMLDivElement>(null);

	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	const springConfig = { stiffness: 200, damping: 21, mass: 0.32 };
	const tiltX = useSpring(pointerX, springConfig);
	const tiltY = useSpring(pointerY, springConfig);

	const updateTilt = useCallback(
		(clientX: number, clientY: number) => {
			const el = wrapRef.current;
			if (!el || reducedMotion) return;
			const r = el.getBoundingClientRect();
			if (r.width < 1 || r.height < 1) return;
			const px = (clientX - r.left) / r.width - 0.5;
			const py = (clientY - r.top) / r.height - 0.5;
			pointerX.set(-py * POINTER_TILT_X);
			pointerY.set(px * POINTER_TILT_Y);
		},
		[pointerX, pointerY, reducedMotion],
	);

	const resetTilt = useCallback(() => {
		pointerX.set(0);
		pointerY.set(0);
	}, [pointerX, pointerY]);

	return (
		<div className="hero-logo-3d-stage">
			<motion.div
				className="hero-logo-3d-orbit"
				style={{ transformStyle: "preserve-3d" }}
				animate={
					reducedMotion
						? undefined
						: {
								rotateY: [13, -13, 13],
								rotateX: [3.5, -3, 3.5],
								rotateZ: [-1.2, 1.2, -1.2],
							}
				}
				transition={{
					duration: 11,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<motion.div
					ref={wrapRef}
					className="hero-logo-3d-tilt"
					style={{
						rotateX: tiltX,
						rotateY: tiltY,
						transformStyle: "preserve-3d",
					}}
					onPointerMove={(e) => {
						if (e.pointerType === "mouse") {
							updateTilt(e.clientX, e.clientY);
						}
					}}
					onPointerEnter={(e) => {
						if (e.pointerType === "mouse") {
							updateTilt(e.clientX, e.clientY);
						}
					}}
					onPointerLeave={() => resetTilt()}
				>
					<motion.div
						className="hero-visual-frame hero-visual-frame--logo"
						animate={
							reducedMotion
								? undefined
								: {
										boxShadow: [...FRAME_SHADOW_KEYS],
								}
						}
						transition={{
							duration: 4.2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
						whileHover={
							reducedMotion
								? undefined
								: {
										scale: 1.035,
										transition: {
											type: "spring",
											stiffness: 380,
											damping: 22,
										},
									}
						}
						whileTap={reducedMotion ? undefined : { scale: 0.982 }}
					>
						<motion.div
							className="hero-visual-inner hero-visual-inner--logo"
							animate={
								reducedMotion
									? undefined
									: {
											filter: [
												"brightness(1) saturate(1.05)",
												"brightness(1.08) saturate(1.12)",
												"brightness(1) saturate(1.05)",
											],
										}
							}
							transition={{
								duration: 5,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						>
							<img
								className="hero-visual-logo hero-visual-logo--3d"
								src={BRAND_LOGO_SRC}
								alt=""
								width={414}
								height={414}
								decoding="async"
								draggable={false}
							/>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
