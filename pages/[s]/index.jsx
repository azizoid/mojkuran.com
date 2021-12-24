import { useEffect, useContext, useRef } from "react";
import Head from "next/head";

import MainLayout from "../../layouts/main.layout";
import SoorahAyah from "../../components/soorah.ayah.component";

import { AppContext } from "../../assets/context";
import SOORAH_LIST from "../../assets/soorahList";

const Soorah = ({ out, data }) => {
  const context = useRef(useContext(AppContext));

  useEffect(() => {
    context.current.setForm({ ...data });
  }, [data]);

  if (!out || out.length === 0) {
    return (
      <MainLayout>
        <div className='text-center'>
          <div className='col-sm-12 alert alert-danger'>
            Sura nije pronađena
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>
          Sura {SOORAH_LIST[data["s"]]} | Čitaj svoju knjigu | mojkuran.com
        </title>
        <meta
          name='description'
          content={out
            .slice(0, 15)
            .map((ayah) => ayah.c)
            .join(" ")}
        />
      </Head>
      <ul className='list-group list-group-flush'>
        {data.s !== 9 && (
          <li className='list-group-item'>
            <h3 className='text-center'>&#65021;</h3>
          </li>
        )}
        {out.map((ayah) => (
          <SoorahAyah ayah={ayah} key={ayah.id} />
        ))}
      </ul>
    </MainLayout>
  );
};

// export async function getServerSideProps({ query }) {
//   const soorah = query.s;
//   const t = query.t || 1;

//   console.log(query);
//   console.log(`https://quran.az/api/${soorah}?t=${t}`);

//   const propsData = await fetch(
//     `https://quran.az/api/${soorah}?t=${t}`
//   ).then((response) => response.json());

//   const props = {
//     error: "Not Found",
//     out: [],
//     data: { s: null, a: null },
//   };

//   if (propsData.out && propsData.out.length > 0) {
//     props.out = propsData.out;
//     props.data = propsData.data;
//   } else context.response = "404";
//   return { props };
// }

export async function getStaticPaths() {
  const paths = [...Array(114).keys()].map((soorah) => ({
    params: { s: (soorah + 1).toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`https://mojkuran.com/api/${params.s}`);
  const propsData = await res.json();

  const props = {
    error: "Not Found",
    out: [],
    data: { s: 0, a: "" },
  };

  if (propsData.out && propsData.out.length > 0) {
    props.error = "";
    props.out = propsData.out;
    props.data = propsData.data;
  }

  return { props };
}

export default Soorah;
