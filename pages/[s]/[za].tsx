import Head from "next/head"
import Link from "next/link"
import { GetServerSideProps } from "next"

import MainLayout from "../../layouts/main.layout"

import ColoredText from "../../components/colored.text.component"

import SOORAH_LIST from "../../assets/soorahList"

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

const Ayah = ({ out, data, error }) => {
  if (error !== null) {
    return (
      <MainLayout>
        <div className="text-center">
          <div className="col-sm-12 alert alert-danger">Ajet nije pronađen</div>
        </div>
      </MainLayout>
    )
  }

  const { s, a, c, arabic, transliteration, prev, next } = out[0]

  const paginateLinks = (
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <Link href={`/${data.s}`}>
          <a className="page-link">{`Sura ${SOORAH_LIST[data.s]}`}</a>
        </Link>
      </li>
      {prev !== null && (
        <li className="page-item">
          <Link href={`/${data.s}/${prev}`}>
            <a className="page-link">{prev}</a>
          </Link>
        </li>
      )}
      <li className="page-item disabled">
        <span className="page-link">{data.a}</span>
      </li>
      {next !== null && (
        <li className="page-item">
          <Link href={`/${data.s}/${next}`}>
            <a className="page-link">{next}</a>
          </Link>
        </li>
      )}
    </ul>
  )

  return (
    <MainLayout>
      <Head>
        <title>
          {`Ajet ${data["a"]}, Sura ${SOORAH_LIST[data["s"]]}
           | Čitaj svoju knjigu | mojkuran.com`}
        </title>
        <meta name="description" content={out[0]["c"]} />
      </Head>

      <ul className="list-group list-group-flush col-12">
        {data.soorah !== 1 && data.ayah !== 1 && (
          <li className="list-group-item">
            <h3 className="text-center">&#65021;</h3>
          </li>
        )}
        <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
          {prev !== null && (
            <div className="page-item">
              <Link href={`/${data.s}/${prev}`}>
                <a
                  style={{
                    fontSize: "3em",
                    color: "#6cb2eb",
                  }}
                >
                  <MdNavigateBefore />
                </a>
              </Link>
            </div>
          )}
          <div className="col">
            <strong>{`${s}:${a}`}</strong>
            <br />
            {c}
          </div>
          {next !== null && (
            <div>
              <Link href={`/${data.s}/${next}`}>
                <a
                  style={{
                    fontSize: "3em",
                    color: "#6cb2eb",
                  }}
                >
                  <MdNavigateNext />
                </a>
              </Link>
            </div>
          )}
        </li>
        <li
          className="list-group-item list-group-item-action"
          style={{ padding: "2rem" }}
        >
          <ColoredText key="transliteration" content={transliteration} />
        </li>
        <li
          className="list-group-item list-group-item-action"
          style={{ padding: "2rem" }}
        >
          <h2 className="text-end text-top arabic">{arabic}</h2>
        </li>
        <li className="list-group-item">{paginateLinks}</li>
      </ul>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const soorah = query.s
  const ayah = query.za
  // const t = query.t || 1;

  const response = await fetch(`https://mojkuran.com/api/${soorah}/${ayah}`)
  const propsData = await response.json()

  const props = {
    error: "Ayah not found",
    out: [],
    data: { s: 0, a: "" },
  }

  if (propsData.out && propsData.out.length > 0) {
    props.out = propsData.out
    props.data = propsData.data
    props.error = null
  }

  return { props }
}

export default Ayah
