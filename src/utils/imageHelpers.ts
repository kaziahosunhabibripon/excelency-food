const BASE_IMAGE_URL =
  "https://rapiderp.excellency-catering-restaurant-sweets.com/";

const NO_COUNTRY_FLAG = "uploads/defaults/no-country-flag.png";

export function getImageUrl(imagePath?: string): string {
  if (!imagePath) return `${BASE_IMAGE_URL}${NO_COUNTRY_FLAG}`;

  const isFullUrl = /^https?:\/\//i.test(imagePath);
  return isFullUrl
    ? imagePath
    : `${BASE_IMAGE_URL}${imagePath.replace(/^\/+/, "")}`;
}
