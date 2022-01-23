import React, { useEffect, useState } from "react"

import SOORAH_LIST from "../../assets/soorahList"
import { DisplayData } from "../../lib/types"
import { Card } from "../../ui/Card/Card"
import { getApiData } from "../../utility/getApiData/getApiData"

const RandomAyah = (): JSX.Element => {
  const [out, setOut] = useState<DisplayData>({
    id: "",
    soorah: 96,
    ayah: 1,
    content: "Čitaj, u ime Gospodara tvoga, koji stvara,",
  })

  useEffect(() => {
    getApiData("/api/random").then((data) => {
      if (data.success) {
        setOut(data.out)
      }
    })
  }, [])

  return (
    <Card title="PROČITAJ JOŠ">
      <h6 className="text-gray-500">
        {`${SOORAH_LIST[out.soorah]}, ${out.ayah}`}
      </h6>
      <h6 className="text-gray-700 hover:underline">
        <a href={`/${out.soorah}/${out.ayah}`}>{out.content}</a>
      </h6>
    </Card>
  )
}
export default RandomAyah
