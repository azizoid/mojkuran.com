import useSWR from 'swr'
import { buildUrl } from '@/helpers/buildUrl'
import { fetcher } from '@/utility/fetcher'
import { Card } from '../Card/Card'
import { soorahAyahTitle } from '@/helpers/soorahAyahTitle'
import { LoaderDots } from '../LoaderDots'


export const RandomAyah = () => {
  const {
    data,
    isLoading,
    error: isError,
  } = useSWR(['/api/v2/random', 'randomAyah'], fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (isLoading || isError) {
    return <LoaderDots />
  }

  const { soorah, ayah, content } = data

  return (
    <Card title={soorahAyahTitle(soorah, ayah)}>
      <h6>
        <a href={buildUrl(soorah, ayah)} className="text-blue-400 hover:underline">
          {content}
        </a>
      </h6>
    </Card>
  )
}
