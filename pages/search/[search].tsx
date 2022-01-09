import React, { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router"

import Pagination from "react-js-pagination"

import { MainLayout } from "../../layouts/MainLayout"
import { Empty } from "../../components/Empty/Empty"
import Loader from "../../ui/Loader/Loader"
import { SearchAyah } from "../../components/SearchAyah/SearchAyah"
import { PaginationProps } from "../../utility/paginate/paginate"
import { DisplayData, PageStates } from "../../lib/types"
import { getApiData } from "../../utility/getApiData/getApiData"

export const Search = (): JSX.Element => {
  const [paginate, setPaginate] = useState<PaginationProps>()
  const [out, setOut] = useState<DisplayData[]>()
  const [pageState, setPageState] = useState(PageStates.INIT)
  const [page, setPage] = useState(1)

  const router = useRouter()
  const query = router.query.search?.toString()

  const getData = useCallback(async () => {
    setPageState(PageStates.LOADING)

    await getApiData(`/api/search/${query}?page=${page}`)
      .then(({ out, paginate }) => {
        if (out?.length > 0) {
          setOut(out)
          setPaginate({
            ...paginate,
            currentPage: Number(paginate.currentPage),
          })
        }
      })
      .finally(() => setPageState(PageStates.SEARCH))
  }, [page, query])

  useEffect(() => {
    if (query?.length > 2) {
      setPage(1)
      getData()
    }
  }, [query, getData])

  if (pageState === PageStates.EMPTY) {
    return (
      <MainLayout>
        <div className="row">
          <div className="col-sm-12 alert alert-danger">
            Riječ nije pronađena
          </div>
          <Empty alert="danger" />
        </div>
      </MainLayout>
    )
  }

  if (pageState === PageStates.LOADING) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    )
  }

  const paginateLinks = paginate?.total > paginate?.perPage && (
    <li className="list-group-item">
      <Pagination
        activePage={paginate.currentPage}
        itemsCountPerPage={paginate.perPage}
        totalItemsCount={paginate.total}
        pageRangeDisplayed={5}
        innerClass="pagination justify-content-center"
        itemClass="page-item"
        linkClass="page-link"
        onChange={setPage}
      />
    </li>
  )

  return (
    <MainLayout>
      <ul className="list-group list-group-flush col-12">
        {paginateLinks}

        {out?.map((ayah) => (
          <SearchAyah ayah={ayah} mark={query} key={ayah.id} />
        ))}

        {paginateLinks}
      </ul>
    </MainLayout>
  )
}

export default Search
