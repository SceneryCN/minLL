import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from "framer-motion";
import { useEffect } from "react";

const SPRING = { stiffness: 210, damping: 28, mass: 0.55 };
const HALF = 220;

export default function CursorAura() {
	const reducedMotion = useReducedMotion() ?? false;
	const mx = useMotionValue(-9999);
	const my = useMotionValue(-9999);
	const cx = useSpring(mx, SPRING);
	const cy = useSpring(my, SPRING);
	const left = useTransform(cx, (v) => v - HALF);
	const top = useTransform(cy, (v) => v - HALF);

	useEffect(() => {
		if (reducedMotion) return;

		mx.set(window.innerWidth / 2);
		my.set(window.innerHeight / 2);

		let raf = 0;
		const onMove = (e: MouseEvent) => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				mx.set(e.clientX);
				my.set(e.clientY);
			});
		};
		const onLeave = () => {
			mx.set(window.innerWidth / 2);
			my.set(window.innerHeight / 2);
		};

		window.addEventListener("mousemove", onMove);
		document.documentElement.addEventListener("mouseleave", onLeave);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("mousemove", onMove);
			document.documentElement.removeEventListener("mouseleave", onLeave);
		};
	}, [mx, my, reducedMotion]);

	if (reducedMotion) {
		return null;
	}

	return (
		<motion.div
			className="cursor-aura"
			aria-hidden
			style={{
				position: "fixed",
				left,
				top,
				width: HALF * 2,
				height: HALF * 2,
				pointerEvents: "none",
			}}
		/>
	);
}
