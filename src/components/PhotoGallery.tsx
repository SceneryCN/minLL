import { motion, useReducedMotion } from "framer-motion";
import { Crown, User } from "lucide-react";
import { t } from "@/i18n";
import { THRONE_PHOTOS, FULLBODY_PHOTOS } from "@/constants/assets";
import {
	contentStaggerVariants,
	fadeUpItemVariants,
} from "@/utils/motion-page";
import "@/styles/Gallery.css";

/* ── 照片卡片 ── */
function PhotoCard({
	src,
	label,
	index,
	reducedMotion,
}: {
	src: string;
	label: string;
	index: number;
	reducedMotion: boolean;
}) {
	const item = fadeUpItemVariants(reducedMotion);

	return (
		<motion.div
			className="photo-card"
			variants={item}
			whileHover={
				reducedMotion
					? undefined
					: {
						y: -8,
						scale: 1.02,
						transition: { type: "spring", stiffness: 320, damping: 22 },
					}
			}
			style={{ transitionDelay: `${index * 80}ms` }}
		>
			<div className="photo-frame">
				<img
					src={src}
					alt={label}
					loading="lazy"
					decoding="async"
					className="photo-img"
				/>
				{!reducedMotion && <div className="photo-shimmer" aria-hidden />}
			</div>
			<div className="photo-caption">
				<span className="photo-caption-line" aria-hidden />
				<span className="photo-caption-text">
					{t(`gallery.labels.${label}`)}
				</span>
			</div>
		</motion.div>
	);
}

/* ── 区块标题 ── */
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
	const item = fadeUpItemVariants(reducedMotion);
	return (
		<motion.div
			className="gallery-section-header"
			variants={contentStaggerVariants(reducedMotion)}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-80px" }}
		>
			<motion.span className="gallery-section-icon" variants={item}>
				<Icon size={18} />
			</motion.span>
			<motion.h2 className="gallery-section-title" variants={item}>
				{t(titleKey)}
			</motion.h2>
			<motion.p className="gallery-section-desc" variants={item}>
				{t(descKey)}
			</motion.p>
		</motion.div>
	);
}

/* ── 主组件 ── */
export default function PhotoGallery() {
	const reducedMotion = useReducedMotion() ?? false;
	const content = contentStaggerVariants(reducedMotion);

	return (
		<section className="gallery" aria-label="照片展示">
			{/* ── 王座照 ── */}
			<div className="gallery-section">
				<SectionHeader
					icon={Crown}
					titleKey="gallery.throneTitle"
					descKey="gallery.throneDesc"
					reducedMotion={reducedMotion}
				/>

				<motion.div
					className="photo-grid photo-grid--throne"
					variants={content}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
				>
					{THRONE_PHOTOS.map((p, i) => (
						<PhotoCard
							key={p.name}
							src={p.src}
							label={p.label}
							index={i}
							reducedMotion={reducedMotion}
						/>
					))}
				</motion.div>
			</div>

			{/* 分隔线 */}
			<div className="gallery-divider" aria-hidden />

			{/* ── 全身照 ── */}
			<div className="gallery-section">
				<SectionHeader
					icon={User}
					titleKey="gallery.fullbodyTitle"
					descKey="gallery.fullbodyDesc"
					reducedMotion={reducedMotion}
				/>

				<motion.div
					className="photo-grid photo-grid--fullbody"
					variants={content}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
				>
					{FULLBODY_PHOTOS.map((p, i) => (
						<PhotoCard
							key={p.name}
							src={p.src}
							label={p.label}
							index={i}
							reducedMotion={reducedMotion}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
}
