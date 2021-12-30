import Head from "next/head"
import { MainLayout } from "../layouts/MainLayout"
import { Empty } from "../components/Empty/Empty"

export const Home = (): JSX.Element => (
  <MainLayout>
    <Head>
      <title>Čitaj svoju knjigu | Mojkuran.com </title>
    </Head>
    <Empty />
  </MainLayout>
)

export default Home
