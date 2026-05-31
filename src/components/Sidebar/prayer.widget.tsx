'use client'

import { Smartphone } from 'lucide-react'
import useSWR from 'swr'
import { fetcher } from '@/utility/fetcher'
import { LoaderDots } from '../LoaderDots'

const namazIosAppUrl = 'https://apps.apple.com/app/id6760599914'

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
      <div className="w-full bg-gray-700 px-4 py-2 text-white">
        <a
          href={namazIosAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="origin"
          aria-label="Otvori Nam.az iPhone aplikaciju u App Storeu"
          className="flex items-center justify-center gap-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-85"
        >
          <Smartphone size={14} aria-hidden="true" className="text-green-300" />
          <span>Skini Nam.az aplikaciju za iPhone</span>
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
