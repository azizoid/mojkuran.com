import { soorahList } from '@/assets/soorah-list-object'
import { buildUrl } from '@/utility/buildUrl'

import { PaginationLink } from '../PaginationLink/PaginationLink'

export type PaginateAyahProps = {
  soorah: number
  ayah: number
  ayahOnly?: boolean
}

export const PaginateAyah = ({ soorah, ayah, ayahOnly = true }: PaginateAyahProps) => {
  const soorahIndex = soorah - 1

  const prevAyah = ayah === 1 ? null : ayah - 1
  const nextAyah = ayah === soorahList[soorahIndex]?.ayahCount ? null : ayah + 1

  const prevSoorah =
    !ayahOnly && !prevAyah && soorah > 1 ? soorahList[soorahIndex - 1]?.title : null
  const nextSoorah =
    !ayahOnly && !nextAyah && soorah < 114 ? soorahList[soorahIndex + 1]?.title : null

  return (
    <div className="pagination">
      {prevSoorah && (
        <PaginationLink href={buildUrl(soorah - 1)}>
          {`${soorah - 1}. ${prevSoorah} ←`}
        </PaginationLink>
      )}
      {prevAyah && (
        <PaginationLink href={buildUrl(soorah, prevAyah)}>{prevAyah}</PaginationLink>
      )}

      <span className="pagination-disabled">{ayah}</span>

      {nextAyah && (
        <PaginationLink href={buildUrl(soorah, nextAyah)}>{nextAyah}</PaginationLink>
      )}
      {nextSoorah && (
        <PaginationLink href={buildUrl(soorah + 1)}>
          {`${soorah + 1}. ${nextSoorah} →`}
        </PaginationLink>
      )}
    </div>
  )
}
