import { useEffect, useState, ReactElement } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import { useQuery } from "react-query"

import Pagination from "react-js-pagination"

import { MainLayout } from "../../layouts/MainLayout"
import { Loader } from "../../ui/Loader/Loader"
import { SearchAyah } from "../../components/SearchAyah/SearchAyah"
import { ReponseProps } from "../api/search/[search]"

export const Search = () => {
  const { query } = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  const searchQuery =
    typeof query?.search === "string" && query?.search?.length > 2
      ? query?.search
      : undefined

  const { data, isLoading, error, refetch } = useQuery<ReponseProps>(
    ["out", { page: currentPage, perPage: 30 }],
    () =>
      fetch(`/api/search/${searchQuery}?page=${currentPage}`).then((res) =>
        res.json()
      ),
    {
      enabled: !!searchQuery,
    }
  )

  useEffect(() => {
    if (!!searchQuery) {
      refetch()
    }
  }, [refetch, searchQuery])

  if (error) {
    return (
      <div className="col-sm-12 alert alert-danger">Riječ nije pronađena</div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  const paginateLinks = data?.paginate &&
    data.paginate?.total > data.paginate?.perPage && (
      <li className="list-group-item">
        <Pagination
          activePage={data.paginate.currentPage}
          itemsCountPerPage={data.paginate.perPage}
          totalItemsCount={data.paginate.total}
          pageRangeDisplayed={5}
          innerClass="pagination"
          itemClass="pagination-item"
          activeClass="pagination-active"
          onChange={setCurrentPage}
          hideDisabled={true}
        />
      </li>
    )

  return (
    <>
      <Head>
        <title>Čitaj svoju knjigu | Mojkuran.com </title>
      </Head>

      {data?.out.length === 0 && (
        <div className="col-sm-12 alert alert-danger">Riječ nije pronađena</div>
      )}

      {data?.out.length > 0 && (
        <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
          {paginateLinks}

          {data.out.map((ayah) => (
            <SearchAyah ayah={ayah} mark={searchQuery} key={ayah.id} />
          ))}

          {paginateLinks}
        </ul>
      )}
    </>
  )
}

Search.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

// eslint-disable-next-line import/no-default-export
export default Search
