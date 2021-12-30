import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"

const SoorahAyah = ({ ayah }): JSX.Element => {
  return (
    <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
      <div className="text-start px-1">
        <span className="badge rounded-pill bg-primary">{ayah.a}</span> {ayah.c}
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
