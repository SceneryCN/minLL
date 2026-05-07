import { useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

export function useMagneticSpring(strength = 0.42) {
	const ref = useRef<HTMLButtonElement>(null);
	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const x = useSpring(rawX, SPRING);
	const y = useSpring(rawY, SPRING);

	const onPointerMove = useCallback(
		(e: React.PointerEvent<HTMLButtonElement>) => {
			const el = ref.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			const cx = r.left + r.width / 2;
			const cy = r.top + r.height / 2;
			rawX.set((e.clientX - cx) * strength);
			rawY.set((e.clientY - cy) * strength);
		},
		[rawX, rawY, strength],
	);

	const onPointerLeave = useCallback(() => {
		rawX.set(0);
		rawY.set(0);
	}, [rawX, rawY]);

	return { ref, x, y, onPointerMove, onPointerLeave };
}
