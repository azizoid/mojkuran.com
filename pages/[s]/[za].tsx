import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { MainLayout } from "../../layouts/MainLayout"
import { ColoredText } from "../../ui/ColoredText/ColoredText"

import SOORAH_LIST from "../../assets/soorahList"

import styles from "./za.module.scss"
import classNames from "classnames"

export const Ayah = ({ out, data, error }) => {
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
                <a className={styles.navigateButton}>
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
                <a className={styles.navigateButton}>
                  <MdNavigateNext />
                </a>
              </Link>
            </div>
          )}
        </li>
        <li
          className={classNames(
            "list-group-item list-group-item-action",
            styles.ayahDetails
          )}
        >
          <ColoredText key="transliteration" content={transliteration} />
        </li>
        <li
          className={classNames(
            "list-group-item list-group-item-action",
            styles.ayahDetails
          )}
        >
          <h2 className="text-end text-top">{arabic}</h2>
        </li>
        <li className="list-group-item">{paginateLinks}</li>
      </ul>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const soorah = query.s
  const ayah = query.za

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
