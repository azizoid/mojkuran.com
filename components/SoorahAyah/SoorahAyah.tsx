import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { DisplayData } from "../../lib/types"

export type SoorahAyahProps = {
  data: DisplayData
}

export const SoorahAyah = ({ data }: SoorahAyahProps): JSX.Element => (
  <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
    <div className="text-start px-1">
      <span className="badge rounded-pill bg-primary">{data.ayah}</span>{" "}
      {data.content}
    </div>
    <Link href={`/${data.soorah}/${data.ayah}`}>
      <a>
        <FaExternalLinkAlt />
      </a>
    </Link>
  </li>
)

export default SoorahAyah
