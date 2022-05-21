import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { DisplayData } from "../../lib/types"

export type SoorahAyahProps = {
  data: DisplayData
}

export const SoorahAyah = ({ data }: SoorahAyahProps): JSX.Element => (
  <li className="group soorah-list-item">
    <div>
      <span className="badge bg-blue-200 group-hover:bg-blue-500">
        {data.ayah}
      </span>{" "}
      {data.content}
    </div>
    <Link href={`/${data.soorah}/${data.ayah}`}>
      <a className="ml-2 text-gray-200 group-hover:text-blue-500">
        <FaExternalLinkAlt />
      </a>
    </Link>
  </li>
)
