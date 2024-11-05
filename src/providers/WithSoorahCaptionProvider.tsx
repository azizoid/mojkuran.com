import { PropsWithChildren } from 'react'

import { WithFormProvider } from '@/providers/WithFormProvider'
import { Bismillah } from '@/components/Bismillah/Bismillah'
import { SoorahCaption } from '@/components/SoorahCaption/SoorahCaption'
import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList'

type WithSoorahCaptionProviderProps = PropsWithChildren<{
  soorah: number
  bismillah?: boolean
}>

export const WithSoorahCaptionProvider = ({
  soorah,
  bismillah = true,
  children,
}: WithSoorahCaptionProviderProps) => (
  <WithFormProvider>
    <ul className="page-template-list">
      <SoorahCaption soorah={soorah} />

      {bismillah ? <Bismillah /> : null}

      {children}

      <PaginateSoorahList soorah={soorah} />
    </ul>
  </WithFormProvider>
)
