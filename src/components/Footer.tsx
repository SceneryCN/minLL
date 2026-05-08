import { motion, useReducedMotion } from "framer-motion";
import { Music } from "lucide-react";
import { t } from "@/i18n";
import {
	contentStaggerVariants,
	fadeUpItemVariants,
} from "@/utils/motion-page";
import "@/styles/Footer.css";

export default function Footer() {
	const reducedMotion = useReducedMotion() ?? false;
	const content = contentStaggerVariants(reducedMotion);
	const item = fadeUpItemVariants(reducedMotion);

	return (
		<footer className="site-footer">
			<motion.div
				className="site-footer-inner"
				variants={content}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-40px" }}
			>
				<motion.div className="footer-brand" variants={item}>
					<Music size={16} className="footer-brand-icon" aria-hidden />
					<span className="footer-brand-text">{t("brand.name")}</span>
				</motion.div>

				<motion.p className="footer-blurb" variants={item}>
					{t("footer.blurb")}
				</motion.p>

				<motion.div className="footer-divider" variants={item} aria-hidden />

				<motion.p className="footer-copyright" variants={item}>
					{t("footer.copyright")}
				</motion.p>
			</motion.div>
		</footer>
	);
}
