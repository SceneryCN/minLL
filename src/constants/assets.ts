/** Resolve `/public` filenames against `vite.config` `base` (e.g. GitHub Pages `/minLL/`). */
function publicUrl(filename: string): string {
  const base = import.meta.env.BASE_URL;
  const name = filename.replace(/^\//, '');
  return `${base}${name}`;
}

export const BRAND_LOGO_SRC = publicUrl('LOGO.jpeg');
export const SITE_BACKGROUND_IMAGE_SRC = publicUrl('BackgroundIMG.png');

/* ── 王座照（七叔 → 浮生 → 钩子） ── */
export const THRONE_PHOTOS = [
  { name: 'qishu',   src: publicUrl('on_the_throne_photo/qishu_throne.png'),   label: 'qishu' },
  { name: 'fusheng', src: publicUrl('on_the_throne_photo/fusheng_throne.png'), label: 'fusheng' },
  { name: 'gouzi',   src: publicUrl('on_the_throne_photo/gouzi_throne.png'),   label: 'gouzi' },
] as const;

/* ── 全身照（七叔 → 浮生 → 钩子） ── */
export const FULLBODY_PHOTOS = [
  { name: 'qishu',   src: publicUrl('lift_size_photo/qishu_life_size_photo.png'),       label: 'qishu' },
  { name: 'fusheng', src: publicUrl('lift_size_photo/fusheng_life_size_photo.png.png'), label: 'fusheng' },
  { name: 'gouzi',   src: publicUrl('lift_size_photo/gouzi_life_size_photo.png.png'),   label: 'gouzi' },
] as const;
