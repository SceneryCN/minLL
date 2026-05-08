import { motion, useReducedMotion } from "framer-motion";
import { Music } from "lucide-react";
import { t } from "@/i18n";
import {
	footerDividerVariants,
	footerItemVariants,
	footerRevealVariants,
} from "@/utils/motion-page";
import "@/styles/Footer.css";

export default function Footer() {
	const reducedMotion = useReducedMotion() ?? false;
	const orchestrator = footerRevealVariants(reducedMotion);
	const item = footerItemVariants(reducedMotion);
	const rail = footerDividerVariants(reducedMotion);

	return (
		<footer className="site-footer" id="site-footer">
			<div className="site-footer-atmosphere" aria-hidden>
				{!reducedMotion && (
					<>
						<motion.span
							className="footer-orb footer-orb--a"
							animate={{
								opacity: [0.2, 0.38, 0.2],
								scale: [1, 1.08, 1],
							}}
							transition={{
								duration: 16,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<motion.span
							className="footer-orb footer-orb--b"
							animate={{
								opacity: [0.15, 0.35, 0.15],
								scale: [1.06, 1, 1.06],
							}}
							transition={{
								duration: 20,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					</>
				)}
			</div>

			<div className="footer-wave" aria-hidden>
				<svg viewBox="0 0 1440 56" preserveAspectRatio="none">
					<motion.path
						fill="rgba(12, 10, 18, 0.92)"
						stroke="rgba(212, 175, 55, 0.14)"
						strokeWidth={1}
						d="M0,48 C240,8 480,56 720,28 C960,0 1200,40 1440,18 L1440,56 L0,56 Z"
						initial={reducedMotion ? false : { opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.95,
							ease: [0.16, 1, 0.3, 1],
						}}
					/>
				</svg>
			</div>

			<motion.div
				className="site-footer-inner"
				variants={orchestrator}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-56px" }}
			>
				<motion.div className="footer-brand" variants={item}>
					{!reducedMotion && (
						<motion.span
							className="footer-brand-glow"
							aria-hidden
							animate={{
								scale: [1, 1.18, 1],
								opacity: [0.32, 0.58, 0.32],
							}}
							transition={{
								duration: 5.5,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					)}
					<motion.span
						className="footer-brand-icon-wrap"
						whileHover={
							reducedMotion
								? undefined
								: { rotate: [0, -12, 12, 0], scale: 1.08 }
						}
						transition={{ duration: 0.55 }}
					>
						<Music size={17} className="footer-brand-icon" aria-hidden />
					</motion.span>
					<span className="footer-brand-text">{t("brand.name")}</span>
				</motion.div>

				<motion.p className="footer-blurb" variants={item}>
					{t("footer.blurb")}
				</motion.p>

				<motion.div
					className="footer-divider"
					variants={rail}
					style={{ originX: 0.5 }}
				/>

				<motion.p className="footer-copyright" variants={item}>
					{t("footer.copyright")}
				</motion.p>
			</motion.div>
		</footer>
	);
}
