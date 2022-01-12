import Link from "next/link"
import classnames from "classnames"

export type EmptyProps = {
  alert: "danger" | "success"
}

export const Empty = ({ alert = "success" }): JSX.Element => (
  <div className="row">
    <div className="clearfix col">
      <ol className="breadcrumb justify-content-center">
        <li className="breadcrumb-item active">Čitaj:</li>
        <li className="breadcrumb-item">
          <Link href="/36">Sura Ja-sin</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="/55">Sura Er-Rahman</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="/67">Sura El-Mulk</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="/2/255">Ajetul-Kursi</Link>
        </li>
      </ol>
    </div>

    <div className="clearfix">
      <div className="col">
        <h6
          className={classnames(
            "text-start",
            "alert",
            alert === "danger" ? "alert-info" : "alert-success"
          )}
        >
          Kako biste imali <strong>uspješnu</strong> pretragu pratite slijedeća{" "}
          <strong>pravila</strong>:
        </h6>
      </div>

      <table cellPadding="10">
        <tbody>
          <tr>
            <td></td>
            <td>
              Uslovi korišćenja stranice: <code>mojkuran.com/96/1</code>
            </td>
          </tr>
          <tr>
            <td className="text-end align-top">Greške:</td>
            <td>
              Gramatičke greške vašeg unosa mogu biti razlog da ne dobijete
              nikakav rezultat pretrage.
              <br />
              Na primjer: Umjesto <code>Mekka</code> napišite <code>Mekku</code>{" "}
              ili <code>Mekke</code>
            </td>
          </tr>
          <tr>
            <td className="text-end align-top">Različite rečenice:</td>
            <td>
              Riječi i rečenice koje se možda ne nalaze u ovom prevodu. Na
              primjer: U pretraživač NE unosite rečenice kao što su:{" "}
              <code>&quot;Kako obaviti namaz&quot;</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default Empty
