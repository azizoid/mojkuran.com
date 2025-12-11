import { notFound, redirect } from 'next/navigation'

import { soorahList } from '@/assets/soorah-list-object'
import { Bismillah } from '@/components/Bismillah/Bismillah'
import { ColoredText } from '@/components/ColoredText/ColoredText'
import { soorahAyahTitle } from '@/helpers/soorahAyahTitle'
import { getView } from '@/utility/getView'
import { type AyahResponseType, getAyahService } from './getAyahService'
import { PaginateAyah } from './PaginateAyah'

type AyahProps = {
  params: Promise<{
    soorah: string
    ayah: string
  }>
}

// Enable dynamic rendering to prevent NoFallbackError
// This allows on-demand generation of ayah pages
export const dynamic = 'force-dynamic'

export const generateMetadata = async (props: AyahProps) => {
  const { soorah, ayah } = await props.params
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))

  if (!soorahTitle) return

  const title = `Sura ${soorahTitle.id}. ${soorahTitle.title}, ajet ${Number(ayah)}`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const AyahPage = async (props: AyahProps) => {
  const params = await props.params

  const { soorah: soorahParam, ayah: ayahParam } = params

  const { s: soorah, a: ayah, view } = getView({ s: Number(soorahParam), a: Number(ayahParam) })

  if (view !== 'ayah') {
    if (view === 'soorah') {
      redirect(`/${soorah}`)
    }

    notFound()
  }

  let out: AyahResponseType
  try {
    out = await getAyahService({ soorah, ayah })
  } catch (_error) {
    // If ayah is not found or database error, return 404
    notFound()
  }

  const { content, arabic, transliteration } = out

  return (
    <>
      <Bismillah />

      <li className="prose !max-w-none ayah-list-item flex flex-col">
        <span className="text-gray-400">{soorahAyahTitle(soorah, ayah)}</span>
        {content}
      </li>
      <li className="prose !max-w-none ayah-list-item">
        <ColoredText key="transliteration" content={transliteration} />
      </li>
      <li className="ayah-list-item text-3xl font-Nunito text-right" dir="rtl">
        {arabic}
      </li>
      <li className="py-2">
        <PaginateAyah {...{ soorah, ayah }} />
      </li>
    </>
  )
}

export default AyahPage
