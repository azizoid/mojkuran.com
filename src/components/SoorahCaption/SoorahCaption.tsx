import Link from 'next/link'

import { SOORAH_LIST } from '@/assets/soorah-list-object'


import styles from './SoorahCaption.module.css'
import { CityAndSize } from '../CityAndSize/CityAndSize'
import { buildUrl } from '@/utility/buildUrl'

type SoorahCaptionProps = {
  soorah: number
}

export const SoorahCaption = ({ soorah }: SoorahCaptionProps) => {
  const { title, city, ayahCount } = SOORAH_LIST[soorah]

  return (
    <li
      className={`ayah-list-item text-center text-lg md:text-2xl font-thin ${styles.header} flex align-middle justify-center whitespace-nowrap`}
    >
      <Link
        href={buildUrl(soorah, undefined)}
        className="text-gray-400 hover:text-black decoration-1"
        prefetch={false}
      >
        {`${soorah}. Sura ${title}`}
        <span className="flex flex-row justify-center gap-1 text-xs">
          <CityAndSize city={city} ayahCount={ayahCount} devider={true} size="sm" />
        </span>
      </Link>
    </li>
  )
}
