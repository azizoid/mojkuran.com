import React, { useEffect, useState } from "react"

import Loader from "../loader.component"

import SOORAH_LIST from "../../assets/soorahList"
// import Skeleton from "react-loading-skeleton";

const RandomAyah = (): JSX.Element => {
  const [out, setOut] = useState({
    s: "96",
    a: "1",
    c: "Čitaj, u ime Gospodara tvoga, koji stvara,",
    t: 1,
  })
  const [loaded, setLoaded] = useState(0)

  const soorahList = SOORAH_LIST

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://mojkuran.com/api/random")
        .then((response) => response.json())
        .then((data) => {
          setOut(data.out)
          setLoaded(1)
        })
    }
    fetchData()
  }, [])

  if (!loaded) {
    return <Loader />
  }

  return (
    <div className="card">
      <div className="card-header">PROČITAJ JOŠ</div>
      {loaded && (
        <div className="card-body">
          <h6 className="card-title text-muted">
            {`${soorahList[out.s]}, ${out.a}`}
          </h6>
          <h6 className="card-title">
            <a href={`/${out.s}/${out.a}?t=${out.t}`}>{out.c}</a>
          </h6>
        </div>
      )}
    </div>
  )
}
export default RandomAyah
