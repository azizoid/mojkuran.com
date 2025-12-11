'use client'

import { FacebookPage } from './facebook.page'
import { RandomAyah } from './randomayah'

export const Sidebar = () => (
  <div className="text-small col-span-12 mx-4 flex flex-col justify-items-start gap-y-4 lg:col-span-4">
    <RandomAyah />
    <hr />
    <FacebookPage />
  </div>
)
