import React, { useEffect, useState } from "react"

import SOORAH_LIST from "../../assets/soorahList"

const RandomAyah = (): JSX.Element => {
  const [out, setOut] = useState({
    s: "96",
    a: "1",
    c: "Čitaj, u ime Gospodara tvoga, koji stvara,",
    t: 1,
  })

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://mojkuran.com/api/random")
        .then((response) => response.json())
        .then((data) => setOut(data.out))
    }
    fetchData()
  }, [])

  return (
    <div className="card">
      <div className="card-header">PROČITAJ JOŠ</div>
      <div className="card-body">
        <h6 className="card-title text-muted">
          {`${SOORAH_LIST[out.s]}, ${out.a}`}
        </h6>
        <h6 className="card-title">
          <a href={`/${out.s}/${out.a}?t=${out.t}`}>{out.c}</a>
        </h6>
      </div>
    </div>
  )
}
export default RandomAyah
