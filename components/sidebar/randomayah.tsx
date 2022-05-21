import React, { useEffect, useState } from "react"

import { metadata as soorahList } from "../../assets/metadata"
import { DisplayData } from "../../lib/types"
import { Card } from "../../ui/Card/Card"
import { getApiData } from "../../utility/getApiData/getApiData"

export const RandomAyah = (): JSX.Element => {
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
        {`Sura ${soorahList[out.soorah].id}. ${soorahList[out.soorah].title}, ${
          out.ayah
        }`}
      </h6>
      <h6 className="text-gray-700 hover:underline">
        <a href={`/${out.soorah}/${out.ayah}`}>{out.content}</a>
      </h6>
    </Card>
  )
}
