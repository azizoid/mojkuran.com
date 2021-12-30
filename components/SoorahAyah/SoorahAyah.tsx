import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { AyahProps } from "../../assets/types"

export type SoorahAyahProps = { ayah: AyahProps }

export const SoorahAyah = ({ ayah }: SoorahAyahProps): JSX.Element => {
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
