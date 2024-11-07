import { PropsWithChildren } from 'react'

import { WithFormProvider } from '@/providers/WithFormProvider'
import { SoorahCaption } from '@/components/SoorahCaption/SoorahCaption'

type SoorahLayoutProps = PropsWithChildren<{
  params: Promise<{
    soorah: string,
  }>
}>

const SoorahLayout = async ({
  params,
  children,
}: SoorahLayoutProps) => {
  const { soorah } = await params

  return (
    <WithFormProvider>
      <ul className="page-template-list">
        <SoorahCaption soorah={Number(soorah)} />

        {children}
      </ul>
    </WithFormProvider>
  )
}

export default SoorahLayout