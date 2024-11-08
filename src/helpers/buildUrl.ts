export const buildUrl = (soorah: number, ayah?: number): string => {
  const ayahPart = ayah ? `/${ayah}` : ''
  return `/${soorah}${ayahPart}`
}
