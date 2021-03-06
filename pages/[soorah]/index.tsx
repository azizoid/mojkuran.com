import React, { ReactElement } from "react"
import Head from "next/head"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"

import { MainLayout } from "../../layouts/MainLayout"
import { SoorahAyah } from "../../components/SoorahAyah/SoorahAyah"

import { metadata as soorahList } from "../../assets/metadata"
import { getApiData } from "../../utility/getApiData/getApiData"
import { DisplayData, PageStates } from "../../lib/types"
import { Bismillah } from "../../ui/Bismillah/Bismillah"
import { SoorahCaption } from "../../ui/SoorahCaption/SoorahCaption"

export const Soorah = ({ out, data, error }): JSX.Element => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <div className="text-center">
        <div className="col-sm-12 alert alert-danger">Sura nije pronađena</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          {`Sura ${soorahList[data.s].id}. ${soorahList[data.s].title}
           | Čitaj svoju knjigu | mojkuran.com`}
        </title>
        <meta
          name="description"
          content={out
            .slice(0, 15)
            .map(({ content }) => content)
            .join(" ")}
        />
      </Head>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        <SoorahCaption soorah={data.s} />
        {data.s !== 9 && <Bismillah />}
        {out.map((data: DisplayData) => (
          <SoorahAyah data={data} key={data.id} />
        ))}
      </ul>
    </>
  )
}

Soorah.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await getApiData(`/api/${params.soorah}`)

  if (result.success === false) {
    return {
      props: {
        error: PageStates.NOT_FOUND,
        out: [],
        data: { s: 0, a: "" },
      },
    }
  }

  return {
    props: {
      error: "",
      out: result.out,
      data: result.data,
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default Soorah
