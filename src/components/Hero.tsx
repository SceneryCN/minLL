import { Mic2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { BRAND_LOGO_SRC } from "@/constants/assets";
import { t } from "@/i18n";
import "@/styles/Hero.css";

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const visualRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-in");
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
		);

		[
			titleRef.current,
			subtitleRef.current,
			descRef.current,
			visualRef.current,
		].forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section
			className="hero hero--folio"
			ref={heroRef}
			aria-labelledby="hero-title"
		>
			<div className="hero-bg">
				<div className="hero-vignette" aria-hidden />
				<div className="gradient-orb orb-1" />
				<div className="gradient-orb orb-2" />
				<div className="gradient-orb orb-3" />
				<div className="grid-pattern" />
				<div className="hero-grain" aria-hidden />
			</div>

			<div className="hero-container">
				<div className="hero-content">
					<div className="badge">
						<Mic2 size={14} aria-hidden />
						<span>{t("hero.badgeOrg")}</span>
					</div>

					<h1 className="hero-title" id="hero-title" ref={titleRef}>
						<span className="title-line">{t("brand.welcomeLine")}</span>
						<span className="title-name">{t("brand.headline")}</span>
					</h1>

					<p className="hero-subtitle" ref={subtitleRef}>
						{t("brand.subtitle")}
					</p>

					<p className="hero-desc hero-desc--short" ref={descRef}>
						{t("brand.description")}
					</p>
				</div>

				<div className="hero-visual-wrapper" ref={visualRef}>
					<div className="hero-visual-frame hero-visual-frame--logo">
						<div className="hero-visual-inner hero-visual-inner--logo">
							<img
								className="hero-visual-logo"
								src={BRAND_LOGO_SRC}
								alt=""
								width={414}
								height={414}
								decoding="async"
							/>
						</div>
					</div>
				</div>
			</div>

			<button
				type="button"
				className="scroll-indicator"
				aria-label={t("hero.scrollHint")}
				onClick={() =>
					window.scrollTo({
						top: document.documentElement.scrollHeight,
						behavior: "smooth",
					})
				}
			>
				<span className="scroll-indicator-label">{t("hero.scrollHint")}</span>
				<span className="scroll-mouse" aria-hidden>
					<span className="scroll-wheel" />
				</span>
			</button>
		</section>
	);
}
