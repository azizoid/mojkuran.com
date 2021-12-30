import React, { FC } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"

import { TiSocialFacebookCircular, TiSocialInstagram } from "react-icons/ti"

const PrayerWidget = dynamic(
  () => import("../components/sidebar/prayer.widget"),
  {
    // loading: () => <Loader />,
    ssr: false,
  }
)
const RandomAyah = dynamic(() => import("../components/sidebar/randomayah"), {
  loading: () => <Loader />,
  ssr: false,
})
const FacebookPage = dynamic(
  () => import("../components/sidebar/facebook.page"),
  {
    // loading: () => <Loader />,
    ssr: false,
  }
)

import { Footer } from "../components/Footer/Footer"
import { Form } from "../components/Form/Form"
import { Loader } from "../components/Loader/Loader"
import classnames from "classnames"

import styles from "./MainLayout.module.scss"

export const MainLayout: FC = ({ children }) => (
  <>
    <div className="container position-relative">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/" passHref={true}>
          <a className="navbar-brand d-flex align-items-center text-muted">
            <Image
              src="/img/kuran-logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="quran.az"
            />
            &nbsp; Mojkuran.com
          </a>
        </Link>

        <div className="position-absolute end-0">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                href="https://facebook.com/mojkuran"
                target="_blank"
                rel="noreferrer"
                className="nav-link"
              >
                <TiSocialFacebookCircular color="#4267B2" size="24" />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://instagram.com/mojkuran"
                target="_blank"
                rel="noreferrer"
                className="nav-link"
              >
                <TiSocialInstagram color="#E1306C" size="24" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div className={classnames("clearfix", styles.ornament)} />

    <div className={classnames("container", styles.mainContainer)}>
      <div className="row">
        <div className="col-12 col-lg-7">
          <Form />
          {children}
        </div>
        <div className={classnames("col-12 col-lg-4", styles.mainSidebar)}>
          <PrayerWidget />
          <hr />
          <RandomAyah />
          <hr />
          <FacebookPage />
        </div>
      </div>
    </div>

    <Footer />
  </>
)

export default MainLayout
