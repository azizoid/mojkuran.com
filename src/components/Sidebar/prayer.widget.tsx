'use client'

import { fetcher } from '@/utility/fetcher'
import useSWR from 'swr'
import { LoaderDots } from '../LoaderDots'
import { MapPinnedIcon } from 'lucide-react'

const prayersListEmpty = [
  { id: 1, title: 'Zora', time: '--:--' },
  { id: 2, title: 'Izlazak', time: '--:--' },
  { id: 3, title: 'Podne', time: '--:--' },
  { id: 4, title: 'Ikindija', time: '--:--' },
  { id: 5, title: 'Akšam', time: '--:--' },
  { id: 6, title: 'Jatsija', time: '--:--' },
]

export const PrayerWidget = () => {
  const { data, error } = useSWR(['https://api.vaktija.ba/vaktija/v1/77', 'vaktija'], fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (error) return <div />
  if (!data) return <LoaderDots />

  const updatedPrayers = prayersListEmpty.map((prayer, i) => ({
    ...prayer,
    time: data.vakat[i] || '--:--',
  }))

  return (
    <div className="w-full text-sm">
      <div className="flex w-full items-center justify-evenly bg-gray-700 px-4 py-2 text-white">
        <time dateTime={data.datum[0]} className="text-center">
          {data.datum[0]}, Sarajevo
        </time>
        <a href="https://vaktija.ba" target="_blank" rel="noreferrer">
          <MapPinnedIcon size={14} className="text-green-300" />
        </a>
      </div>

      <div className="grid grid-cols-2 divide-y lg:grid-cols-3">
        {updatedPrayers.map((prayer, index) => (
          <div
            key={prayer.id}
            className="flex place-content-center gap-2 p-2 hover:bg-gray-100 border-b"
          >
            <span className="text-right font-medium">{updatedPrayers[index].title}</span>
            <time className="tabular-nums">{updatedPrayers[index].time}</time>
          </div>
        ))}
      </div>
    </div>
  )
}
