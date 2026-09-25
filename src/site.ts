export const SITE_ORIGIN = 'https://moon.bdbddc.com'
export const SITE_URL = `${SITE_ORIGIN}/`
export const SITE_LAST_MODIFIED = '2026-09-25'

export function isPublicSite(url: string) {
  return new URL(url).hostname === new URL(SITE_ORIGIN).hostname
}
