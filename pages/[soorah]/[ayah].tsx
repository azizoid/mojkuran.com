import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { MainLayout } from "../../layouts/MainLayout"
import { ColoredText } from "../../ui/ColoredText/ColoredText"

import SOORAH_LIST from "../../assets/soorahList"

import styles from "../../styles/soorahAyah.module.scss"
import classNames from "classnames"
import { getData } from "../../utility/getData/getDtata"
import { PageStates } from "../../lib/types"

export const Ayah = ({ out, data, error }) => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <MainLayout>
        <div className="text-center">
          <div className="col-sm-12 alert alert-danger">Ajet nije pronađen</div>
        </div>
      </MainLayout>
    )
  }

  const { soorah, ayah, content, arabic, transliteration, prev, next } = out

  const paginateLinks = (
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <Link href={`/${soorah}`}>
          <a className="page-link">{`Sura ${SOORAH_LIST[ayah]}`}</a>
        </Link>
      </li>
      {prev !== null && (
        <li className="page-item">
          <Link href={`/${soorah}/${prev}`}>
            <a className="page-link">{prev}</a>
          </Link>
        </li>
      )}
      <li className="page-item disabled">
        <span className="page-link">{ayah}</span>
      </li>
      {next !== null && (
        <li className="page-item">
          <Link href={`/${soorah}/${next}`}>
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
          {`Ajet ${ayah}, Sura ${SOORAH_LIST[soorah]}
           | Čitaj svoju knjigu | mojkuran.com`}
        </title>
        <meta name="description" content={content} />
      </Head>

      <ul className="list-group list-group-flush col-12">
        {soorah !== 1 && ayah !== 1 && (
          <li className="list-group-item">
            <h3 className="text-center">&#65021;</h3>
          </li>
        )}
        <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
          {prev !== null && (
            <div className="page-item">
              <Link href={`/${soorah}/${prev}`}>
                <a className={styles.navigateButton}>
                  <MdNavigateBefore />
                </a>
              </Link>
            </div>
          )}
          <div className="col">
            <strong>{`${soorah}:${ayah}`}</strong>
            <br />
            {content}
          </div>
          {next !== null && (
            <div>
              <Link href={`/${soorah}/${next}`}>
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
  const soorah = query.soorah
  const ayah = query.ayah

  const res = await getData(`${process.env.NEXTAUTH_URL}/api/${soorah}/${ayah}`)

  console.log(res)

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
