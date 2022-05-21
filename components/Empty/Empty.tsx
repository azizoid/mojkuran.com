import Link from "next/link"
import { Card } from "../../ui/Card/Card"
import { SoorahList } from "../SoorahLIst/SoorahList"

export const Empty = (): JSX.Element => (
  <div className="space-y-4">
    <ol className="py-2 w-full flex justify-center text-gray-500 space-x-5 text-sm md:text-base">
      <li>
        <Link href="/1">
          <a>Sura El-Fatiha</a>
        </Link>
      </li>
      <li>
        <Link href="/36">
          <a>Sura Ja-sin</a>
        </Link>
      </li>
      <li>
        <Link href="/55">
          <a>Sura Er-Rahman</a>
        </Link>
      </li>
      <li>
        <Link href="/67">
          <a>Sura El-Mulk</a>
        </Link>
      </li>
      <li>
        <Link href="/2/255">
          <a>Ajetul-Kursi</a>
        </Link>
      </li>
    </ol>

    <SoorahList />

    <div className="col">
      <h6 className="alert alert-success">
        Kako biste imali <strong>uspješnu</strong> pretragu pratite slijedeća{" "}
        <strong>pravila</strong>:
      </h6>
    </div>

    <div className="grid grid-1 md:grid-cols-3 gap-2 py-4">
      <Card
        title="Uslovi korištenja"
        className="flex flex-col space-y-4"
        size="small"
      >
        <code>mojkuran.com/96/1</code>
        <code>mojkuran.com/23</code>
      </Card>
      <Card title="Greške:" size="small">
        Gramatičke greške vašeg unosa mogu biti razlog da ne dobijete nikakav
        rezultat pretrage.
        <br />
        Na primjer: Umjesto <code>Mekka</code> napišete <code>Mekku</code> ili{" "}
        <code>Mekke</code>
      </Card>
      <Card title="Različite rečenice:" size="small">
        Riječi i rečenice koje se možda ne nalaze u ovom prevodu. Na primjer: U
        pretraživač NE unosite rečenice kao što su:{" "}
        <code>&quot;Kako obaviti namaz&quot;</code>
      </Card>
    </div>
  </div>
)
