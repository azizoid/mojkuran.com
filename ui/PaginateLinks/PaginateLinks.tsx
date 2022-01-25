import Link from "next/link"
import SOORAH_LIST from "../../assets/soorahList"

export type PaginateLinksProps = {
  soorah: number
  ayah: number
  prev?: number
  next?: number
}

export const PaginateLinks = ({
  soorah,
  ayah,
  prev,
  next,
}: PaginateLinksProps): JSX.Element => (
  <div className="pagination">
    <Link href={`/${soorah}`}>
      <a className="pagination-item">{`Sura ${SOORAH_LIST[soorah]}`}</a>
    </Link>
    {prev !== null && (
      <Link href={`/${soorah}/${prev}`}>
        <a className="pagination-item">{prev}</a>
      </Link>
    )}
    <span className="pagination-disabled">{ayah}</span>
    {next !== null && (
      <Link href={`/${soorah}/${next}`}>
        <a className="pagination-item">{next}</a>
      </Link>
    )}
  </div>
)
