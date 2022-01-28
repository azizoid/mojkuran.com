import { GetServerSideProps } from "next"
import Head from "next/head"
import { MainLayout } from "../../layouts/MainLayout"
import { ColoredText } from "../../ui/ColoredText/ColoredText"

import SOORAH_LIST from "../../assets/soorahList"

import { getApiData } from "../../utility/getApiData/getApiData"
import { PageStates } from "../../lib/types"
import { Bismillah } from "../../ui/Bismillah/Bismillah"
import { PaginateLinks } from "../../ui/PaginateLinks/PaginateLinks"

export const Ayah = ({ out, error }) => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <MainLayout>
        <div className="col-sm-12 alert alert-danger">Ajet nije pronađen</div>
      </MainLayout>
    )
  }

  const { soorah, ayah, content, arabic, transliteration, prev, next } = out

  return (
    <MainLayout>
      <Head>
        <title>
          {`Ajet ${ayah}, Sura ${SOORAH_LIST[soorah]}
           | Čitaj svoju knjigu | mojkuran.com`}
        </title>
        <meta name="description" content={content} />
      </Head>

      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700 mb-4">
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
    </MainLayout>
  )
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
