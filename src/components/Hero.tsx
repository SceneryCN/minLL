import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { Mic2 } from "lucide-react";
import HeroAmbient from "@/components/HeroAmbient";
import HeroLogoCard from "@/components/HeroLogoCard";
import StaggerChars from "@/components/StaggerChars";
import { t } from "@/i18n";
import "@/styles/Hero.css";
import {
	badgeSpringVariants,
	charRevealBoldVariants,
	charRevealSoftVariants,
	contentStaggerVariants,
	fadeUpItemVariants,
	headlineAccentVariants,
	heroShellVariants,
	h1BlockVariants,
	logoRevealVariants,
} from "@/utils/motion-page";

export default function Hero() {
	const reducedMotion = useReducedMotion() ?? false;
	const item = fadeUpItemVariants(reducedMotion);
	const accent = headlineAccentVariants(reducedMotion);
	const content = contentStaggerVariants(reducedMotion);
	const logo = logoRevealVariants(reducedMotion);
	const badge = badgeSpringVariants(reducedMotion);
	const shell = heroShellVariants(reducedMotion);
	const h1Block = h1BlockVariants(reducedMotion);
	const charSoft = charRevealSoftVariants(reducedMotion);
	const charBold = charRevealBoldVariants(reducedMotion);

	const { scrollY } = useScroll();
	const bgParallaxY = useTransform(scrollY, [0, 720], [0, -120]);
	const gridShift = useTransform(scrollY, [0, 600], [0, 18]);

	return (
		<motion.section
			className="hero hero--folio"
			aria-labelledby="hero-title"
			variants={shell}
			initial="hidden"
			animate="visible"
		>
			<motion.div
				className="hero-bg"
				style={reducedMotion ? undefined : { y: bgParallaxY }}
			>
				<motion.div
					className="hero-bg-shimmer"
					aria-hidden
					animate={
						reducedMotion
							? undefined
							: {
									opacity: [0.06, 0.18, 0.08, 0.16, 0.06],
									scale: [1, 1.05, 1.02, 1.06, 1],
									rotate: [0, 2, -1, 0],
								}
					}
					transition={{
						duration: 11,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<div className="hero-vignette" aria-hidden />
				<HeroAmbient />
				<motion.div
					className="grid-pattern"
					style={reducedMotion ? undefined : { y: gridShift }}
					animate={
						reducedMotion
							? undefined
							: { opacity: [0.65, 1, 0.72, 0.95, 0.65] }
					}
					transition={{
						duration: 12,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<div className="hero-grain" aria-hidden />
			</motion.div>

			<div className="hero-container">
				<motion.div
					className="hero-content"
					variants={content}
					initial="hidden"
					animate="visible"
				>
					<motion.div variants={badge} className="badge-shell">
						{!reducedMotion && (
							<motion.span
								className="badge-aureole"
								animate={{
									scale: [1, 1.38, 1],
									opacity: [0.55, 0, 0.55],
									rotate: [0, 180, 360],
								}}
								transition={{
									duration: 4.2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
								aria-hidden
							/>
						)}
						<div className="badge">
							<motion.span
								className="badge-icon-wrap"
								animate={
									reducedMotion
										? undefined
										: {
												rotate: [0, -14, 12, -8, 0],
												scale: [1, 1.12, 1],
											}
								}
								transition={{
									duration: 6,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								<Mic2 size={14} aria-hidden />
							</motion.span>
							<span>{t("hero.badgeOrg")}</span>
						</div>
					</motion.div>

					<motion.h1
						className="hero-title"
						id="hero-title"
						style={{
							perspective: reducedMotion ? undefined : 1100,
							transformStyle: reducedMotion ? undefined : "preserve-3d",
						}}
						variants={h1Block}
					>
						{reducedMotion ? (
							<>
								<motion.span className="title-line" variants={item}>
									{t("brand.welcomeLine")}
								</motion.span>
								<motion.span className="title-name" variants={accent}>
									{t("brand.headline")}
								</motion.span>
							</>
						) : (
							<>
								<StaggerChars
									text={t("brand.welcomeLine")}
									className="title-line"
									reducedMotion={false}
									stagger={0.036}
									charVariants={charSoft}
								/>
								<StaggerChars
									text={t("brand.headline")}
									className="title-name title-name--split"
									charClassName="title-name-char"
									reducedMotion={false}
									stagger={0.052}
									charVariants={charBold}
								/>
							</>
						)}
					</motion.h1>

					<motion.p
						className="hero-subtitle"
						variants={{
							hidden: {},
							visible: {
								transition: { staggerChildren: reducedMotion ? 0 : 0.018 },
							},
						}}
					>
						{reducedMotion ? (
							t("brand.subtitle")
						) : (
							<StaggerChars
								text={t("brand.subtitle")}
								className="hero-subtitle-split"
								charClassName="hero-subtitle-char"
								reducedMotion={false}
								stagger={0.022}
								charVariants={charSoft}
							/>
						)}
					</motion.p>

					<motion.p
						className="hero-desc hero-desc--short"
						variants={{
							hidden: {},
							visible: {
								transition: { staggerChildren: reducedMotion ? 0 : 0.016 },
							},
						}}
					>
						{reducedMotion ? (
							t("brand.description")
						) : (
							<StaggerChars
								text={t("brand.description")}
								className="hero-desc-split"
								charClassName="hero-desc-char"
								reducedMotion={false}
								stagger={0.014}
								charVariants={charSoft}
							/>
						)}
					</motion.p>
				</motion.div>

				<motion.div
					className="hero-visual-wrapper"
					variants={logo}
					initial="hidden"
					animate="visible"
				>
					<HeroLogoCard />
				</motion.div>
			</div>

			<div className="hero-scroll-anchor">
				<div className="hero-scroll-stack">
					<motion.span
						className="scroll-indicator-glow"
						aria-hidden
						animate={
							reducedMotion
								? undefined
								: {
										scale: [1, 1.45, 1],
										opacity: [0.22, 0.72, 0.22],
									}
						}
						transition={{
							duration: 2.8,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
					<motion.button
						type="button"
						className="scroll-indicator scroll-indicator--fx"
						aria-label={t("hero.scrollHint")}
						initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.9 }}
						animate={{
							opacity: 1,
							y: reducedMotion ? 0 : [0, 9, 0],
							scale: 1,
							rotate: reducedMotion ? 0 : [0, -1.5, 1.5, 0],
						}}
						transition={
							reducedMotion
								? { duration: 0 }
								: {
										opacity: {
											delay: 1.05,
											duration: 0.55,
											ease: [0.16, 1, 0.3, 1],
										},
										y: {
											delay: 1.2,
											duration: 2.4,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
										},
										scale: { delay: 1.05, duration: 0.55 },
										rotate: {
											delay: 1.4,
											duration: 5,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
										},
									}
						}
						whileHover={
							reducedMotion
								? undefined
								: {
										y: 8,
										scale: 1.06,
										rotate: 2,
									}
						}
						whileTap={reducedMotion ? undefined : { scale: 0.9 }}
						onClick={() => {
							const gallery = document.querySelector('.gallery');
							if (gallery) {
								gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
							} else {
								window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
							}
						}}
					>
						<span className="scroll-indicator-label">{t("hero.scrollHint")}</span>
						<span className="scroll-mouse" aria-hidden>
							<span className="scroll-wheel" />
						</span>
					</motion.button>
				</div>
			</div>
		</motion.section>
	);
}
