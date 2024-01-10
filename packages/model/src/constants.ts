export const DESCRIPTION_REGEX =
  /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/;

export const OG_DESCRIPTION_REGEX =
  /<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/;

export const OG_IMAGE_REGEX =
  /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/;

export const HANGUL_BREAK_REGEX = /�/;

// 'https://www.neusral.com/r?n=YKCRY7Lyem' => 'YKCRY7Lyem'
export const NEUSRAL_N_ID_REGEX = /r\?n=(.*)/;

export const DEFAULT_TIME_ZONE = 'Asia/Tokyo';
