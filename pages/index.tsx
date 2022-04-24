import { ReactElement } from "react"
import Head from "next/head"
import { MainLayout } from "../layouts/MainLayout"
import { Empty } from "../components/Empty/Empty"

export const Home = (): JSX.Element => (
  <>
    <Head>
      <title>Čitaj svoju knjigu | Mojkuran.com </title>
    </Head>
    <Empty />
  </>
)

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Home
