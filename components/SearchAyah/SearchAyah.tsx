import Link from "next/link"
import Highlighter from "react-highlight-words"
import { FaExternalLinkAlt } from "react-icons/fa"
import { DisplayData } from "../../lib/types"

export type SearchAyahProps = {
  ayah: DisplayData
  mark?: string
}

export const SearchAyah = ({ ayah, mark = "" }): JSX.Element => (
  <li className="soorah-list-item">
    <div className="text-start mx-1">
      <span className="badge">
        {ayah.soorah}:{ayah.ayah}
      </span>{" "}
      {ayah.content}
      <Highlighter
        searchWords={[mark]}
        textToHighlight={ayah.content}
        autoEscape={true}
        highlightClassName="bg-warning"
      />
    </div>
    <Link href={`/${ayah.soorah}/${ayah.ayah}`} className="ml-2 text-blue-500">

      <FaExternalLinkAlt />

    </Link>
  </li>
)
