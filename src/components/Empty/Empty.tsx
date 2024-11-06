import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { SoorahList } from '../SoorahList/SoorahList'
import { Card } from '../Card/Card'
import { ScrollArea } from "../ui/scroll-area"

const topLinks = [
  ['/1', 'Sura El-Fatiha'],
  ['/36', 'Sura Ja-sin'],
  ['/55', 'Sura Er-Rahman'],
  ['/67', 'Sura El-Mulk'],
  ['/2/255', 'Ajetul-Kursi'],
]

export const Empty = (): JSX.Element => (
  <div className="space-y-4">

    <ScrollArea className="h-svh w-full">
      <Breadcrumb className='py-2 w-full flex justify-center text-gray-500 space-x-5 text-sm md:text-base'>
        <BreadcrumbList>
          {topLinks.map(([url, text], index) => (
            <>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink href={url}>{text}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ))}
        </BreadcrumbList >
      </Breadcrumb>

      <SoorahList />
    </ScrollArea>


    <div className="prose !max-w-none col">
      <h6 className="alert alert-success">
        Kako biste imali <strong>uspješnu</strong> pretragu pratite slijedeća{" "}
        <strong>pravila</strong>:
      </h6>
    </div>

    <div className="grid grid-1 md:grid-cols-3 gap-2 py-4">
      <Card
        title="Uslovi korištenja"
        className="flex flex-col"
      >
        <code>mojkuran.com/96/1</code>
        <code>mojkuran.com/23</code>
      </Card>
      <Card title="Greške:">
        Gramatičke greške vašeg unosa mogu biti razlog da ne dobijete nikakav
        rezultat pretrage.
        <br />
        Na primjer: Umjesto <code>Mekka</code> napišete <code>Mekku</code> ili{" "}
        <code>Mekke</code>
      </Card>
      <Card title="Različite rečenice:" >
        Riječi i rečenice koje se možda ne nalaze u ovom prevodu. Na primjer: U
        pretraživač NE unosite rečenice kao što su:{" "}
        <code>&quot;Kako obaviti namaz&quot;</code>
      </Card>
    </div>
  </div>
)
