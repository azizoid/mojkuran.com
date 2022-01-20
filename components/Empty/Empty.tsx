import Link from "next/link"
import { Card } from "../../ui/Card/Card"

export const Empty = (): JSX.Element => (
  <div className="space-y-4">
    <ol className="py-2 w-full flex justify-center text-gray-500 space-x-5 md:text-sm">
      <li className="">Čitaj:</li>
      <li className="">
        <Link href="/36">Sura Ja-sin</Link>
      </li>
      <li className="">
        <Link href="/55">Sura Er-Rahman</Link>
      </li>
      <li className="">
        <Link href="/67">Sura El-Mulk</Link>
      </li>
      <li className="">
        <Link href="/2/255">Ajetul-Kursi</Link>
      </li>
    </ol>

    <div className="col">
      <h6 className="alert alert-success">
        Kako biste imali <strong>uspješnu</strong> pretragu pratite slijedeća{" "}
        <strong>pravila</strong>:
      </h6>
    </div>

    <div className="grid grid-cols-3 gap-2 py-4">
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

export default Empty
