import { SOORAH_LIST } from '@/assets/soorah-list-object'

import { buildUrl } from '@/utility/buildUrl'
import { PaginationLink } from '../PaginationLink/PaginationLink'

export type PaginateSoorahListProps = {
  soorah: number
}

export const PaginateSoorahList = ({
  soorah,
}: PaginateSoorahListProps): JSX.Element => {
  const prev = soorah === 1 ? null : soorah - 1
  const next = soorah === 114 ? null : soorah + 1

  return (
    <div className="pagination">
      {prev !== null ? (
        <PaginationLink
          href={buildUrl(prev)}
          className="flex flex-col text-center"
        >
          {`${SOORAH_LIST[prev]['id']}. Sura ${SOORAH_LIST[prev]['title']}`}
        </PaginationLink>
      ) : null}

      <span className="pagination-disabled flex flex-col text-center">
        {`${SOORAH_LIST[soorah]['id']} Sura ${SOORAH_LIST[soorah]['title']}`}
      </span>

      {next !== null ? (
        <PaginationLink
          href={buildUrl(next)}
          className="flex flex-col text-center"
        >
          {`${SOORAH_LIST[next]['id']}. Sura ${SOORAH_LIST[next]['title']}`}
        </PaginationLink>
      ) : null}
    </div>
  )
}
