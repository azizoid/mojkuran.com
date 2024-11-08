import { fetcher } from "@/utility/fetcher"
import React from "react"
import useSWR from "swr"
import { LoaderDots } from "../LoaderDots"

const prayersListEmpty = [
  { id: 1, title: "Zora", time: "--:--" },
  { id: 2, title: "Izlazak", time: "--:--" },
  { id: 3, title: "Podne", time: "--:--" },
  { id: 4, title: "Ikindija", time: "--:--" },
  { id: 5, title: "Akšam", time: "--:--" },
  { id: 6, title: "Jatsija", time: "--:--" },
]

export const PrayerWidget = (): JSX.Element => {
  const { data, error } = useSWR(
    ["https://api.vaktija.ba/vaktija/v1/77", 'vaktija'],
    fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (error) return <div />
  if (!data) return <LoaderDots />

  const updatedPrayers = prayersListEmpty.map((prayer, i) => ({
    ...prayer,
    time: data.vakat[i] || "--:--",
  }))

  return (
    <table className="w-full table-auto text-sm" cellPadding={7}>
      <thead className="bg-gray-700 text-white">
        <tr>
          <td align="center" colSpan={4}>
            {data.datum[0]}, Sarajevo
          </td>
        </tr>
      </thead>
      <tbody>
        {updatedPrayers.map((prayer, index) => (
          <React.Fragment key={prayer.id}>
            {index % 2 === 0 && (
              <tr>
                <td align="right">{prayer.title}</td>
                <td>{prayer.time}</td>
                <td align="right">{updatedPrayers[index + 1]?.title || ""}</td>
                <td>{updatedPrayers[index + 1]?.time || ""}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
