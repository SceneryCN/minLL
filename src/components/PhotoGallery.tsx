import { motion, useReducedMotion } from "framer-motion";
import { Crown, Sparkles, User } from "lucide-react";
import GalleryPhotoCard from "@/components/GalleryPhotoCard";
import { THRONE_PHOTOS, FULLBODY_PHOTOS } from "@/constants/assets";
import { t } from "@/i18n";
import {
	footerDividerVariants,
	galleryGridVariants,
	galleryHeaderItemVariants,
	galleryHeaderVariants,
	seductivePhotoVariants,
} from "@/utils/motion-page";
import "@/styles/Gallery.css";

function SectionHeader({
	icon: Icon,
	titleKey,
	descKey,
	reducedMotion,
}: {
	icon: React.ElementType;
	titleKey: string;
	descKey: string;
	reducedMotion: boolean;
}) {
	const header = galleryHeaderVariants(reducedMotion);
	const item = galleryHeaderItemVariants(reducedMotion);

	return (
		<motion.div
			className="gallery-section-header"
			variants={header}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-72px" }}
		>
			<motion.span
				className="gallery-section-icon"
				variants={item}
				whileHover={
					reducedMotion
						? undefined
						: {
								rotate: [0, -8, 8, 0],
								scale: 1.06,
								transition: { duration: 0.55 },
							}
				}
			>
				<Icon size={18} strokeWidth={1.75} />
			</motion.span>
			<motion.div className="gallery-section-title-row" variants={item}>
				<motion.span
					className="gallery-section-kicker"
					animate={
						reducedMotion
							? undefined
							: { opacity: [0.5, 1, 0.5] }
					}
					transition={{
						duration: 5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				>
					<Sparkles size={12} aria-hidden />
				</motion.span>
				<h2 className="gallery-section-title">{t(titleKey)}</h2>
				<motion.span
					className="gallery-section-kicker gallery-section-kicker--trail"
					animate={
						reducedMotion
							? undefined
							: { opacity: [0.5, 1, 0.5] }
					}
					transition={{
						duration: 5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
						delay: 0.6,
					}}
				>
					<Sparkles size={12} aria-hidden />
				</motion.span>
			</motion.div>
			<motion.p className="gallery-section-desc" variants={item}>
				{t(descKey)}
			</motion.p>
		</motion.div>
	);
}

export default function PhotoGallery() {
	const reducedMotion = useReducedMotion() ?? false;
	const grid = galleryGridVariants(reducedMotion);
	const photoV = seductivePhotoVariants(reducedMotion);
	const rail = footerDividerVariants(reducedMotion);

	return (
		<section className="gallery" id="gallery" aria-label={t("gallery.sectionAria")}>
			<div className="gallery-atmosphere" aria-hidden>
				{!reducedMotion && (
					<>
						<motion.span
							className="gallery-fog gallery-fog--a"
							animate={{
								opacity: [0.22, 0.42, 0.22],
								scale: [1, 1.06, 1],
							}}
							transition={{
								duration: 14,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<motion.span
							className="gallery-fog gallery-fog--b"
							animate={{
								opacity: [0.18, 0.38, 0.18],
								scale: [1.04, 1, 1.04],
							}}
							transition={{
								duration: 18,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					</>
				)}
			</div>

			<div className="gallery-section gallery-section--throne">
				<SectionHeader
					icon={Crown}
					titleKey="gallery.throneTitle"
					descKey="gallery.throneDesc"
					reducedMotion={reducedMotion}
				/>

				<motion.div
					className="photo-grid photo-grid--throne"
					variants={grid}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-48px" }}
				>
					{THRONE_PHOTOS.map((p) => (
						<GalleryPhotoCard
							key={p.name}
							src={p.src}
							labelKey={p.label}
							variants={photoV}
							layout="throne"
						/>
					))}
				</motion.div>
			</div>

			<motion.div
				className="gallery-divider"
				variants={rail}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-20px" }}
				aria-hidden
			/>

			<div className="gallery-section gallery-section--fullbody">
				<SectionHeader
					icon={User}
					titleKey="gallery.fullbodyTitle"
					descKey="gallery.fullbodyDesc"
					reducedMotion={reducedMotion}
				/>

				<motion.div
					className="photo-grid photo-grid--fullbody"
					variants={grid}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-48px" }}
				>
					{FULLBODY_PHOTOS.map((p) => (
						<GalleryPhotoCard
							key={p.name}
							src={p.src}
							labelKey={p.label}
							variants={photoV}
							layout="fullbody"
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
}
