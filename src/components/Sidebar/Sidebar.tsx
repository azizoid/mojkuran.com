'use client'

import { FacebookPage } from './facebook.page'
import { PrayerWidget } from './prayer.widget'
import { RandomAyah } from './randomayah'

export const Sidebar = () => (
  <>
    <PrayerWidget />
    <hr />
    <RandomAyah />
    <hr />
    <FacebookPage />
  </>
)
