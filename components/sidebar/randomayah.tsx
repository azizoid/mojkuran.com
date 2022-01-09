import React, { useEffect, useState } from "react"

import SOORAH_LIST from "../../assets/soorahList"
import { DisplayData } from "../../lib/types"
import { getApiData } from "../../utility/getApiData/getApiData"

const RandomAyah = (): JSX.Element => {
  const [out, setOut] = useState<DisplayData>({
    id: "",
    soorah: 96,
    ayah: 1,
    content: "Čitaj, u ime Gospodara tvoga, koji stvara,",
  })

  useEffect(() => {
    getApiData("/api/random").then((data) => setOut(data.out))
  }, [])

  return (
    <div className="card">
      <div className="card-header">PROČITAJ JOŠ</div>
      <div className="card-body">
        <h6 className="card-title text-muted">
          {`${SOORAH_LIST[out.soorah]}, ${out.ayah}`}
        </h6>
        <h6 className="card-title">
          <a href={`/${out.soorah}/${out.ayah}`}>{out.content}</a>
        </h6>
      </div>
    </div>
  )
}
export default RandomAyah
