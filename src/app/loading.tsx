import { LoadingBoxes } from '@/components/LoadingBoxes/LoadingBoxes'
import { WithFormProvider } from '@/providers/WithFormProvider'

export const MainLoader = () => (
  <WithFormProvider>
    <LoadingBoxes />
  </WithFormProvider>
)

export default MainLoader
