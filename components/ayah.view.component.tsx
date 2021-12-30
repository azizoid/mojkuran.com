import Link from "next/link"
import dynamic from "next/dynamic"

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

const ColoredText = dynamic(() => import("./colored.text.component"), {
  ssr: false,
})

const AyahView = ({ data }): JSX.Element => {
  const { s, a, c, arabic, transliteration, prev, next } = data

  return (
    <>
      <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between ">
        {prev !== null && (
          <Link href={`/${data.s}/${prev}`}>
            <a className="ayah-nav-click">
              <MdNavigateBefore />
            </a>
          </Link>
        )}
        <div>
          <strong>{`${s}:${a}`}</strong>
          <br />
          {c}
        </div>
        {next !== null && (
          <Link href={`/${data.s}/${next}`}>
            <a className="ayah-nav-click">
              <MdNavigateNext />
            </a>
          </Link>
        )}
      </li>
      <li className="list-group-item list-group-item-action align-middle ayah-details">
        <ColoredText key="transliteration" content={transliteration} />
      </li>
      <li className="list-group-item list-group-item-action ayah-details">
        <h2 className="text-right align-text-top arabic">{arabic}</h2>
      </li>
      <li className="list-group-item ">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link href={`/${data.s}`}>
              <a className="page-link">Pročitaj suru</a>
            </Link>
          </li>
          {prev !== null && (
            <li className="page-item">
              <Link href={`/${data.s}/${prev}`}>
                <a className="page-link">{prev}</a>
              </Link>
            </li>
          )}
          <li className="page-item disabled">
            <span className="page-link">{data.a}</span>
          </li>
          {next !== null && (
            <li className="page-item">
              <Link href={`/${data.s}/${next}`}>
                <a className="page-link">{next}</a>
              </Link>
            </li>
          )}
        </ul>
      </li>
    </>
  )
}

export default AyahView
