import { FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from '@/components/Link'
import { Sajda } from '@/components/Sajda/Sajda'

import { buildUrl } from '@/helpers/buildUrl'
import type { DisplayData } from '@/helpers/types'

export type SoorahAyahProps = {
  data: DisplayData
  sajda?: number[]
}

export const SoorahAyah = ({ data, sajda }: SoorahAyahProps) => (
  <li className="soorah-list-item">
    <div className="flex flex-row">
      <span className="badge">
        {data.ayah}
        {sajda?.includes(data.ayah) && <Sajda />}
      </span>
      <span>{data.content}</span>
    </div>
    <Link
      href={buildUrl(data.soorah, data.ayah)}
      className="read-ayah"
      prefetch={false}
      title="oxu"
    >
      <FaExternalLinkAlt />
    </Link>
  </li>
)
