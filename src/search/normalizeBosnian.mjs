const MARKS = /\p{M}/gu

/** @param {string} value */
const fold = (value) =>
  value.normalize('NFD').replace(MARKS, '').toLowerCase().replace(/đ/g, 'dj')

/** @param {string} value */
export const normalizeBosnian = (value) => fold(value)

/** @param {string} content @param {string} normalizedNeedle */
export const matchedText = (content, normalizedNeedle) => {
  if (!normalizedNeedle) return undefined

  let normalized = ''
  const sourceRanges = []
  let sourceOffset = 0

  for (const char of content) {
    const start = sourceOffset
    sourceOffset += char.length

    if (/^\p{M}$/u.test(char)) {
      if (sourceRanges.length) sourceRanges[sourceRanges.length - 1].end = sourceOffset
      continue
    }

    const folded = fold(char)
    normalized += folded
    for (let i = 0; i < folded.length; i++) {
      sourceRanges.push({ start, end: sourceOffset })
    }
  }

  const start = normalized.indexOf(normalizedNeedle)
  if (start < 0) return undefined

  return content.slice(sourceRanges[start].start, sourceRanges[start + normalizedNeedle.length - 1].end)
}
