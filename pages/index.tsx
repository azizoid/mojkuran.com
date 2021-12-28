import Head from "next/head"
import MainLayout from "../layouts/main.layout"
import Empty from "../components/empty.component"

export const Home = () => (
  <MainLayout>
    <Head>
      <title>Čitaj svoju knjigu | Mojkuran.com </title>
    </Head>
    <Empty />
  </MainLayout>
)

export default Home
