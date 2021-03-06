import React, { useState, useEffect, useCallback } from "react"

const prayersListEmpty = [
  { id: 1, title: "Zora", time: "--:--" },
  { id: 2, title: "Izlazak", time: "--:--" },
  { id: 3, title: "Podne", time: "--:--" },
  { id: 4, title: "Ikindija", time: "--:--" },
  { id: 5, title: "Akšam", time: "--:--" },
  { id: 6, title: "Jatsija", time: "--:--" },
]

export const PrayerWidget = (): JSX.Element => {
  const [prayers, setPrayers] = useState(prayersListEmpty)
  const [hijri, setHijri] = useState("")

  const fetchData = useCallback(async () => {
    await fetch("https://api.vaktija.ba/vaktija/v1/77")
      .then((response) => response.json())
      .then((data) => {
        const out = prayersListEmpty.map((prayer, i) => ({
          ...prayer,
          time: data["vakat"][i],
        }))
        setHijri(data.datum[0])
        setPrayers(out)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <table className="w-full table-auto text-sm" cellPadding={7}>
      <thead className="bg-gray-700 text-white">
        <tr>
          <td align="center" colSpan={4}>
            {hijri}, Sarajevo
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="right">{prayers[0]["title"]}</td>
          <td>{prayers[0]["time"]}</td>
          <td align="right">{prayers[1]["title"]}</td>
          <td>{prayers[1]["time"]}</td>
        </tr>
        <tr>
          <td align="right">{prayers[2]["title"]}</td>
          <td>{prayers[2]["time"]}</td>
          <td align="right">{prayers[3]["title"]}</td>
          <td>{prayers[3]["time"]}</td>
        </tr>
        <tr>
          <td align="right">{prayers[4]["title"]}</td>
          <td>{prayers[4]["time"]}</td>
          <td align="right">{prayers[5]["title"]}</td>
          <td>{prayers[5]["time"]}</td>
        </tr>
      </tbody>
    </table>
  )
}
