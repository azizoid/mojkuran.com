import Link from "next/link"
import Highlighter from "react-highlight-words"
import { FaExternalLinkAlt } from "react-icons/fa"
import { DisplayData } from "../../lib/types"

export type SearchAyahProps = {
  ayah: DisplayData
  mark?: string
}

export const SearchAyah = ({ ayah, mark = "" }): JSX.Element => (
  <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
    <div className="text-start mx-1">
      <span className="badge rounded-pill bg-primary">
        {ayah.soorah}:{ayah.ayah}
      </span>{" "}
      <Highlighter
        searchWords={[mark]}
        textToHighlight={ayah.content}
        autoEscape={true}
        highlightClassName="bg-warning"
      />
    </div>
    <Link href={`/${ayah.soorah}/${ayah.ayah}`}>
      <a>
        <FaExternalLinkAlt />
      </a>
    </Link>
  </li>
)

export default SearchAyah
