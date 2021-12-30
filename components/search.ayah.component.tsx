import Link from "next/link"
import Highlighter from "react-highlight-words"
import { FaExternalLinkAlt } from "react-icons/fa"

import { AyahProps } from "../assets/types"

export type SoorahAyahProps = {
  ayah: AyahProps
  mark?: string
}

const SoorahAyah = ({ ayah, mark = "" }): JSX.Element => {
  return (
    <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
      <div className="text-start mx-1">
        <span className="badge rounded-pill bg-primary">
          {ayah.s}:{ayah.a}
        </span>{" "}
        <Highlighter
          searchWords={[mark]}
          textToHighlight={ayah.c}
          autoEscape={true}
          highlightClassName="bg-warning"
        />
      </div>
      <Link href={`/${ayah.s}/${ayah.a}`}>
        <a>
          <FaExternalLinkAlt />
        </a>
      </Link>
    </li>
  )
}

export default SoorahAyah
