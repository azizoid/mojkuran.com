import { Link } from "@/components/Link"
import { FaExternalLinkAlt } from 'react-icons/fa'

import Highlighter from 'react-highlight-words'

import { DisplayData } from '@/helpers/types'

import { buildUrl } from '@/helpers/buildUrl'
import { Sajda } from '@/components/Sajda/Sajda'

export type SearchAyahProps = {
  data: DisplayData
  sajda?: number[]
  mark?: string
}

export const SearchAyah = ({ data, sajda, mark = '' }: SearchAyahProps) => (
  <li className="soorah-list-item">
    <div className="flex flex-row">
      <span className="badge">
        <span>{data.soorah}:{data.ayah}</span>
        {sajda?.includes(data.ayah) && <Sajda />}
      </span>{' '}
      <Highlighter
        searchWords={[mark]}
        textToHighlight={data.content}
        autoEscape={true}
        highlightClassName="bg-warning"
      />
    </div>
    <Link
      href={buildUrl(data.soorah, data.ayah)}
      className="read-ayah"
      prefetch={false}
    >
      <FaExternalLinkAlt />
    </Link>
  </li>
)
