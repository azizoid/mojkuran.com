'use client'
import { TerminalIcon } from 'lucide-react'

import { useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { LoaderDots } from '@/components/LoaderDots'
import { Pagination } from '@/components/Pagination/Pagination'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ResponseProps } from '@/helpers/types'
import { fetcher } from '@/utility/fetcher'
import { decodePathSegment } from '@/utility/decodePathSegment'
import { SearchAyah } from './SearchAyah'

// Static export needs one enumerated shell for /search/{anything};
// the Worker maps every /search/* URL onto this shell (URL bar unchanged,
// useParams() reads the real path)
export const generateStaticParams = () => [{ search: 'app' }]

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const prevSearchRef = useRef<string>('')

  useEffect(() => {
    const [route, search] = window.location.pathname.split('/').filter(Boolean)
    if (route === 'search' && search && search !== 'app') {
      setSearchQuery(decodePathSegment(search))
    }
  }, [])

  // Reset page to 1 when search query changes
  useEffect(() => {
    if (searchQuery && searchQuery !== prevSearchRef.current) {
      setCurrentPage(1)
      prevSearchRef.current = searchQuery
    }
  }, [searchQuery])

  // Memoize searchBody for stable SWR key reference
  const searchBody = useMemo(
    () => ({
      search: searchQuery,
      page: String(currentPage),
    }),
    [searchQuery, currentPage]
  )

  // SWR automatically refetches when the key changes
  const { data, error, isLoading } = useSWR<ResponseProps>(
    searchQuery.length > 2 ? ['/api/v3/search', searchBody] : null,
    (url: [string, string]) => fetcher(url, searchBody, 'POST'),
    {
      refreshInterval: 0,
      dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
      keepPreviousData: false,
    }
  )

  if (isLoading) {
    return <LoaderDots />
  }

  if (error || data?.out === null) {
    return (
      <Alert variant="destructive">
        <TerminalIcon className="h-4 w-4" />

        <AlertDescription>
          {error ? 'Pretraga trenutno nije dostupna. Pokušajte ponovo.' : 'Riječ nije pronađena'}
        </AlertDescription>
      </Alert>
    )
  }

  const paginateLinks =
    data?.paginate?.total && data.paginate.total > data?.paginate?.perPage ? (
      <li className="list-group-item py-2">
        <Pagination
          activePage={data?.paginate.currentPage}
          itemsCountPerPage={data?.paginate.perPage}
          totalItemsCount={data?.paginate.total}
          pageRangeDisplayed={5}
          onChange={setCurrentPage}
        />
      </li>
    ) : null

  return (
    <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
      {paginateLinks}

      {data?.out?.map((ayah) => {
        const sajda = SOORAH_LIST[ayah.soorah]?.sajda
        return <SearchAyah data={ayah} sajda={sajda} mark={searchQuery} key={ayah.id} />
      })}

      {paginateLinks}
    </ul>
  )
}

export default Search
