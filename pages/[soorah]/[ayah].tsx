import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { MainLayout } from "../../layouts/MainLayout"
import { ColoredText } from "../../ui/ColoredText/ColoredText"

import SOORAH_LIST from "../../assets/soorahList"

import { getApiData } from "../../utility/getApiData/getApiData"
import { PageStates } from "../../lib/types"

export const Ayah = ({ out, error }) => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <MainLayout>
        <div className="col-sm-12 alert alert-danger">Ajet nije pronađen</div>
      </MainLayout>
    )
  }

  const { soorah, ayah, content, arabic, transliteration, prev, next } = out

  const paginateLinks = (
    <ul className="pagination">
      <li className="pagination-item">
        <Link href={`/${soorah}`}>
          <a>{`Sura ${SOORAH_LIST[soorah]}`}</a>
        </Link>
      </li>
      {prev !== null && (
        <li className="pagination-item">
          <Link href={`/${soorah}/${prev}`}>
            <a>{prev}</a>
          </Link>
        </li>
      )}
      <li className="pagination-disabled">{ayah}</li>
      {next !== null && (
        <li className="pagination-item">
          <Link href={`/${soorah}/${next}`}>
            <a>{next}</a>
          </Link>
        </li>
      )}
    </ul>
  )

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
        {soorah !== 1 && ayah !== 1 && (
          <li className="ayah-list-item text-center text-4xl font-Nunito">
            &#65021;
          </li>
        )}
        <li>{paginateLinks}</li>
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
        <li>{paginateLinks}</li>
      </ul>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const soorah = query.soorah
  const ayah = query.ayah

  const res = await getApiData(
    `${process.env.NEXTAUTH_URL}/api/${soorah}/${ayah}`
  )

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
