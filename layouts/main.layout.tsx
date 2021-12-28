import React, { useContext, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { TiSocialFacebookCircular, TiSocialInstagram } from "react-icons/ti"

import Form from "../components/form.component"

// import PrayerWidget from "../components/sidebar/prayer.widget"
// import RandomAyah from "../components/sidebar/randomayah"
// import FacebookPage from "../components/sidebar/facebook.page"

import Footer from "../components/footer.component"
import { FormContext, FormContextProvider } from "../store/form-store"

const MainLayout = ({ children }) => (
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

    <div className="clearfix" id="ornament" />

    <div className="container" style={{ minHeight: "70vh" }}>
      <div className="row">
        <div className="col-12 col-lg-7">
          <FormContextProvider>
            <Form />
            <br />
            {children}
          </FormContextProvider>
        </div>
        {/* <div className="col-12 col-lg-4" style={{ fontSize: "0.9rem" }}>
          <PrayerWidget />
          <hr />
          <RandomAyah />
          <hr />
          <FacebookPage />
        </div> */}
      </div>
    </div>

    <Footer />
  </>
)

export default MainLayout
