import type { Transition, Variants } from "framer-motion";

/** Smooth editorial decel */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function contentStaggerVariants(reducedMotion: boolean): Variants {
	return {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: reducedMotion ? 0 : 0.13,
				delayChildren: reducedMotion ? 0 : 0.14,
			},
		},
	};
}

/** Opacity + rise + blur reveal */
export function cinematicRevealVariants(
	reducedMotion: boolean,
	blurPx: number,
	y = 36,
): Variants {
	return {
		hidden: reducedMotion
			? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }
			: {
					opacity: 0,
					y,
					filter: `blur(${blurPx}px)`,
					rotateX: blurPx > 16 ? -10 : 0,
				},
		visible: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			rotateX: 0,
			transition: reducedMotion
				? { duration: 0 }
				: {
						duration: 0.92,
						ease: easeOutExpo,
					},
		},
	};
}

export function fadeUpItemVariants(reducedMotion: boolean): Variants {
	return cinematicRevealVariants(reducedMotion, 11, 28);
}

export function headlineAccentVariants(reducedMotion: boolean): Variants {
	return cinematicRevealVariants(reducedMotion, 22, 44);
}

export function badgeSpringVariants(reducedMotion: boolean): Variants {
	return {
		hidden: reducedMotion
			? { opacity: 1, scale: 1, rotateZ: 0 }
			: { opacity: 0, scale: 0.82, rotateZ: -6 },
		visible: {
			opacity: 1,
			scale: 1,
			rotateZ: 0,
			transition: reducedMotion
				? { duration: 0 }
				: {
						type: "spring",
						stiffness: 380,
						damping: 22,
						mass: 0.55,
					},
		},
	};
}

export function logoRevealVariants(reducedMotion: boolean): Variants {
	return {
		hidden: reducedMotion
			? { opacity: 1, scale: 1, x: 0, rotateY: 0 }
			: { opacity: 0, scale: 0.88, x: 64, rotateY: -18 },
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
			rotateY: 0,
			transition: reducedMotion
				? { duration: 0 }
				: ({
						type: "spring",
						stiffness: 156,
						damping: 19,
						mass: 0.72,
						delay: 0.18,
					} satisfies Transition),
		},
	};
}

export function heroShellVariants(reducedMotion: boolean): Variants {
	return {
		hidden: reducedMotion
			? { opacity: 1, scale: 1 }
			: { opacity: 0, scale: 0.965 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: reducedMotion
				? { duration: 0 }
				: { duration: 1.05, ease: easeOutExpo },
		},
	};
}

/** Per-character 3D flip-up (headline accent) */
export function charRevealBoldVariants(reducedMotion: boolean): Variants {
	if (reducedMotion) {
		return {
			hidden: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
			visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
		};
	}
	return {
		hidden: {
			opacity: 0,
			y: 36,
			rotateX: -62,
			filter: "blur(12px)",
		},
		visible: {
			opacity: 1,
			y: 0,
			rotateX: 0,
			filter: "blur(0px)",
			transition: {
				type: "spring",
				stiffness: 280,
				damping: 20,
				mass: 0.45,
			},
		},
	};
}

/** Softer char reveal (welcome line, body) */
export function charRevealSoftVariants(reducedMotion: boolean): Variants {
	if (reducedMotion) {
		return {
			hidden: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
			visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
		};
	}
	return {
		hidden: {
			opacity: 0,
			y: 22,
			rotateX: -38,
			filter: "blur(7px)",
		},
		visible: {
			opacity: 1,
			y: 0,
			rotateX: 0,
			filter: "blur(0px)",
			transition: {
				type: "spring",
				stiffness: 340,
				damping: 24,
			},
		},
	};
}

export function h1BlockVariants(reducedMotion: boolean): Variants {
	return {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: reducedMotion ? 0 : 0.2,
			},
		},
	};
}
