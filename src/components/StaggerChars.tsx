import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";

type StaggerCharsProps = {
	text: string;
	className?: string;
	charClassName?: string;
	reducedMotion: boolean;
	stagger?: number;
	charVariants: Variants;
	lineVariants?: Variants;
};

export default function StaggerChars({
	text,
	className,
	charClassName,
	reducedMotion,
	stagger = 0.042,
	charVariants,
	lineVariants,
}: StaggerCharsProps) {
	const chars = useMemo(
		() =>
			Array.from(text).map((ch, i) => ({
				ch,
				key: `${i}-${ch === " " ? "sp" : ch}`,
			})),
		[text],
	);

	if (reducedMotion) {
		return <span className={className}>{text}</span>;
	}

	const lv: Variants =
		lineVariants ?? {
			hidden: {},
			visible: {
				transition: { staggerChildren: stagger },
			},
		};

	return (
		<motion.span className={className} variants={lv}>
			{chars.map(({ ch, key }) => (
				<motion.span
					key={key}
					className={charClassName}
					variants={charVariants}
					style={{ display: ch === " " ? "inline" : "inline-block" }}
				>
					{ch === " " ? "\u00a0" : ch}
				</motion.span>
			))}
		</motion.span>
	);
}
