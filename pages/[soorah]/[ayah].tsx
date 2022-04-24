import { ReactElement } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { MainLayout } from "../../layouts/MainLayout"
import { ColoredText } from "../../ui/ColoredText/ColoredText"

import { metadata as soorahList } from "../../assets/metadata"

import { getApiData } from "../../utility/getApiData/getApiData"
import { PageStates } from "../../lib/types"
import { Bismillah } from "../../ui/Bismillah/Bismillah"
import { PaginateLinks } from "../../ui/PaginateLinks/PaginateLinks"
import { SoorahCaption } from "../../ui/SoorahCaption/SoorahCaption"

export const Ayah = ({ out, error }) => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <div className="col-sm-12 alert alert-danger">Ajet nije pronađen</div>
    )
  }

  const { soorah, ayah, content, arabic, transliteration, prev, next } = out

  return (
    <>
      <Head>
        <title>
          {`Ajet  ${ayah}, Sura ${soorahList[out.soorah].id}. ${
            soorahList[out.soorah].title
          }
           | Čitaj svoju knjigu | mojkuran.com`}
        </title>
        <meta name="description" content={content} />
      </Head>

      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700 mb-4">
        <SoorahCaption soorah={soorah} />
        {soorah !== 1 && ayah !== 1 && <Bismillah />}
        <li>
          <PaginateLinks {...{ soorah, ayah, prev, next }} />
        </li>
        <li className="ayah-list-item flex flex-col">
          <span className="text-gray-400">{`${soorah}:${ayah}`}</span>
          {content}
        </li>
        <li className="ayah-list-item ">
          <ColoredText key="transliteration" content={transliteration} />
        </li>
        <li
          className="ayah-list-item text-3xl font-Nunito text-right"
          dir="rtl"
        >
          {arabic}
        </li>
        <li>
          <PaginateLinks {...{ soorah, ayah, prev, next }} />
        </li>
      </ul>
    </>
  )
}

Ayah.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const soorah = query.soorah
  const ayah = query.ayah

  const res = await getApiData(`/api/${soorah}/${ayah}`)

  if (res.success === false) {
    return {
      props: {
        error: PageStates.NOT_FOUND,
        out: {},
        data: { s: 0, a: "" },
      },
    }
  }

  return {
    props: {
      error: "",
      out: res.out,
      data: res.data,
    },
  }
}

export default Ayah
