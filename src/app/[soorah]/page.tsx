import { notFound } from 'next/navigation'

import { soorahList } from '@/assets/soorah-list-object'
import { Bismillah } from '@/components/Bismillah/Bismillah'
import { getView } from '@/utility/getView'

import { getSoorahService } from './getSoorahService'
import { SoorahAyah } from './SoorahAyah'


type SoorahProps = {
  params: Promise<{
    soorah: string
  }>
}

export const dynamicParams = false

export const generateStaticParams = async () =>
  soorahList.map((item) => ({
    soorah: item.id.toString(),
  }))

export const generateMetadata = async (props: SoorahProps) => {
  const { soorah } = await props.params;
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))

  if (!soorahTitle) return

  const title = `Sura ${soorahTitle.id}. ${soorahTitle.title}`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const SoorahPage = async (props: SoorahProps) => {
  const { soorah: soorahParam } = await props.params;

  const {
    s: soorah,
    view,
  } = getView({ s: Number(soorahParam) })

  if (view !== 'soorah') {
    notFound()
  }

  const out = await getSoorahService({ soorah })

  const sajda = soorahList.find((soorahItem) => soorahItem.id === soorah)?.sajda

  return (
    <>
      {soorah !== 9 ? <Bismillah /> : null}

      {out.map((outData) => (
        <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
      ))}
    </>
  )
}

export default SoorahPage
