import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { DisplayData } from '@/helpers/types'

import { buildUrl } from '@/utility/buildUrl'
import { Sajda } from '../Sajda/Sajda'

export type SoorahAyahProps = {
  data: DisplayData
  sajda?: number[]
}

export const SoorahAyah = ({ data, sajda }: SoorahAyahProps): JSX.Element => (
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
