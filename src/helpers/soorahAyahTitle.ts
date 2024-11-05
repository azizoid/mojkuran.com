import { SOORAH_LIST } from '@/assets/soorah-list-object'

export const soorahAyahTitle = (soorah: number, ayah: number): string =>
  `${soorah}. Sura ${SOORAH_LIST[soorah]['title']}, ajet ${ayah}`
