import { Form } from '@/components/Form/Form'
import { LoaderProgress } from '@/components/LoaderProgress/LoaderProgress'
import { PropsWithChildren, Suspense } from 'react'



export const WithFormProvider = ({ children }: PropsWithChildren) => (
  <>
    <Suspense fallback={<LoaderProgress />}>
      <Form />
    </Suspense>

    {children}
  </>
)
