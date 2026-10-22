const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative path with the configured `base`, e.g. `url('/notes/')`. */
export const url = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
