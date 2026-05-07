/** Resolve `/public` filenames against `vite.config` `base` (e.g. GitHub Pages `/minLL/`). */
function publicUrl(filename: string): string {
  const base = import.meta.env.BASE_URL;
  const name = filename.replace(/^\//, '');
  return `${base}${name}`;
}

export const BRAND_LOGO_SRC = publicUrl('LOGO.jpeg');
export const SITE_BACKGROUND_IMAGE_SRC = publicUrl('BackgroundIMG.png');
