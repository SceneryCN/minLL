import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	type Variants,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { t } from "@/i18n";

const TILT_X = 14;
const TILT_Y = 18;

type Layout = "throne" | "fullbody";

export default function GalleryPhotoCard({
	src,
	labelKey,
	variants,
	layout,
}: {
	src: string;
	labelKey: string;
	variants: Variants;
	layout: Layout;
}) {
	const reducedMotion = useReducedMotion() ?? false;
	const tiltRootRef = useRef<HTMLDivElement>(null);
	const rx = useMotionValue(0);
	const ry = useMotionValue(0);
	const tiltX = useSpring(rx, { stiffness: 170, damping: 24, mass: 0.42 });
	const tiltY = useSpring(ry, { stiffness: 170, damping: 24, mass: 0.42 });

	const onMove = useCallback(
		(clientX: number, clientY: number) => {
			const el = tiltRootRef.current;
			if (!el || reducedMotion) return;
			const r = el.getBoundingClientRect();
			if (r.width < 1 || r.height < 1) return;
			const px = (clientX - r.left) / r.width - 0.5;
			const py = (clientY - r.top) / r.height - 0.5;
			rx.set(-py * TILT_X);
			ry.set(px * TILT_Y);
		},
		[rx, ry, reducedMotion],
	);

	const reset = useCallback(() => {
		rx.set(0);
		ry.set(0);
	}, [rx, ry]);

	return (
		<motion.article
			className={`photo-card photo-card--${layout}`}
			variants={variants}
		>
			<div
				className="photo-tilt-shell"
				ref={tiltRootRef}
				onPointerMove={(e) => {
					if (e.pointerType === "mouse") {
						onMove(e.clientX, e.clientY);
					}
				}}
				onPointerLeave={reset}
			>
				<motion.div
					className="photo-tilt-inner"
					style={{
						rotateX: reducedMotion ? 0 : tiltX,
						rotateY: reducedMotion ? 0 : tiltY,
						transformStyle: "preserve-3d",
					}}
				>
					<div className="photo-frame-wrap">
						<motion.div
							className="photo-frame"
							whileHover={reducedMotion ? undefined : { scale: 1.012 }}
							transition={{
								type: "spring",
								stiffness: 280,
								damping: 26,
							}}
						>
							<img
								src={src}
								alt={t(`gallery.labels.${labelKey}`)}
								loading="lazy"
								decoding="async"
								className="photo-img"
							/>
							{!reducedMotion && (
								<>
									<motion.div
										className="photo-shimmer photo-shimmer--motion"
										aria-hidden
										animate={{
											backgroundPosition: ["220% 50%", "-220% 50%"],
										}}
										transition={{
											duration: 7,
											repeat: Number.POSITIVE_INFINITY,
											ease: "linear",
										}}
									/>
									<div className="photo-vignette-cap" aria-hidden />
								</>
							)}
						</motion.div>
						{!reducedMotion && (
							<motion.div
								className="photo-border-glow"
								aria-hidden
								animate={{
									opacity: [0.35, 0.72, 0.35],
								}}
								transition={{
									duration: 4.5,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							/>
						)}
					</div>
				</motion.div>
			</div>

			<motion.div
				className="photo-caption"
				initial={false}
				whileHover={
					reducedMotion
						? undefined
						: { x: 6, transition: { type: "spring", stiffness: 320, damping: 28 } }
				}
			>
				<span className="photo-caption-line" aria-hidden />
				<span className="photo-caption-text">
					{t(`gallery.labels.${labelKey}`)}
				</span>
			</motion.div>
		</motion.article>
	);
}
