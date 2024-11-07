'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import useSWR from 'swr'

import { ResponseProps } from '@/app/api/v2/search/route'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { Form } from '@/components/Form/Form'

import { WithFormProvider } from '@/providers/WithFormProvider'

import { fetcher } from '@/utility/fetcher'
import { Pagination } from '@/components/Pagination/Pagination'
import { SearchAyah } from './SearchAyah'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TerminalIcon } from 'lucide-react'

const Search = () => {
  const params = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const searchBody = {
    search: searchQuery,
    page: String(currentPage)
  }

  const { data, error, mutate } = useSWR<ResponseProps>(
    ['/api/v2/search', searchBody],
    searchQuery?.length > 2 ? (url: [string, string]) => fetcher(url, searchBody, 'POST') : null,
    {
      refreshInterval: 0,
      dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
      keepPreviousData: false,
    }
  )

  useEffect(() => {
    if (typeof params?.search === 'string' && params.search.length > 2) {
      setSearchQuery(decodeURIComponent(params.search.toString()))
    }
  }, [params?.search])

  useEffect(() => {
    mutate()
  }, [mutate, currentPage, params?.search])

  if (error || data?.out === null) {
    return (
      <>
        <Form />

        <Alert variant="destructive">
          <TerminalIcon className="h-4 w-4" />

          <AlertDescription>
            Riječ nije pronađena
          </AlertDescription>
        </Alert>
      </>
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
    <WithFormProvider>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        {paginateLinks}

        {data?.out?.map((ayah) => {
          const sajda = SOORAH_LIST[ayah.soorah]?.sajda
          return <SearchAyah data={ayah} sajda={sajda} mark={searchQuery} key={ayah.id} />
        })}

        {paginateLinks}
      </ul>
    </WithFormProvider>
  )
}

export default Search
