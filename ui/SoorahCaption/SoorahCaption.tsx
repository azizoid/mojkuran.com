import Link from "next/link"
import { metadata } from "../../assets/metadata"
import styles from "./SoorahCaption.module.css"
import { CityAndSize } from "../CityAndSize/CityAndSize"

export type SoorahCaptionProps = {
  soorah: number
  translator: number
}

export const SoorahCaption = ({
  soorah,
  translator,
}: SoorahCaptionProps): JSX.Element => {
  const { title, city, ayahCount } = metadata[soorah]

  return (
    <li
      className={`ayah-list-item text-center text-lg md:text-2xl font-thin ${styles.header} flex align-middle justify-center whitespace-nowrap`}
    >
      <Link href={`/${soorah}?t=${translator}`}>
        <a className="text-gray-400 hover:text-black decoration-1">
          {`${soorah}. ${title}`}
          <span className="flex flex-row justify-center gap-1 text-xs">
            <CityAndSize
              city={city}
              ayahCount={ayahCount}
              devider={true}
              size="sm"
            />
          </span>
        </a>
      </Link>
    </li>
  )
}
