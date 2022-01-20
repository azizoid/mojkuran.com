import React, { FC } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

import {
  TiSocialFacebookCircular,
  TiSocialInstagram,
  TiSocialGithub,
} from "react-icons/ti"

const PrayerWidget = dynamic(
  () => import("../components/sidebar/prayer.widget"),
  {
    // loading: () => <Loader />,
    ssr: false,
  }
)
const RandomAyah = dynamic(() => import("../components/sidebar/randomayah"), {
  loading: () => <LoadingBoxes />,
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
import { LoadingBoxes } from "../ui/LoadingBoxes/LoadingBoxes"

import { Logo } from "../components/Logo/Logo"

export const MainLayout: FC = ({ children }) => (
  <div className="flex flex-col h-screen justify-between">
    <div className="bg-[url('../assets/img/ornament.gif')] bg-gray-50 bg-repeat-x bg-bottom pb-[33px] px-3">
      <nav className="h-12 container mx-auto flex justify-between">
        <Link href="/" passHref={true}>
          <a className="py-3 flex items-center content-start text-gray-500 hover:opacity-75">
            <Logo />
            &nbsp; Mojkuran.com
          </a>
        </Link>

        <ul className="flex items-center space-x-2">
          <li>
            <a
              href="https://facebook.com/mojkuran"
              target="_blank"
              rel="noreferrer"
            >
              <TiSocialFacebookCircular color="#4267B2" size="24" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/mojkuran"
              target="_blank"
              rel="noreferrer"
            >
              <TiSocialInstagram color="#E1306C" size="24" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/azizoid/mojkuran.com"
              target="_blank"
              rel="noreferrer"
            >
              <TiSocialGithub color="#333" size="32" />
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div className="flex-grow container mx-auto mt-10 pb-2">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-7 mx-4">
          <Form />
          {children}
        </div>
        <div
          className="
          col-span-12
          lg:col-span-4
          mx-4
          text-small 
          flex 
          flex-col
          justify-items-start
          space-y-4
        "
        >
          <PrayerWidget />
          <hr />
          <RandomAyah />
          <hr />
          <FacebookPage />
        </div>
      </div>
    </div>

    <Footer />
  </div>
)

export default MainLayout
