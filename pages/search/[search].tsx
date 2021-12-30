import React, { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router"

import Pagination from "react-js-pagination"

import { PageStates, PaginationProps } from "../../assets/types"

import { MainLayout } from "../../layouts/MainLayout"
import { Empty } from "../../components/Empty/Empty"
import Loader from "../../components/Loader/Loader"
import { SearchAyah } from "../../components/SearchAyah/SearchAyah"

export const Search = (): JSX.Element => {
  const [paginate, setPaginate] = useState<PaginationProps>()
  const [out, setOut] = useState([])
  const [pageState, setPageState] = useState(PageStates.INIT)
  const [page, setPage] = useState(1)

  const router = useRouter()
  const query = router.query.search?.toString()

  const getData = useCallback(
    async () =>
      await fetch(`https://mojkuran.com/api/search/${query}?page=${page}`)
        .then((response) => response.json())
        .then(({ out, paginate }) => {
          if (out?.length > 0) {
            setOut(out)
            setPaginate(paginate)

            setPageState(PageStates.SEARCH)
          } else {
            setPageState(PageStates.LOADING)
          }
        }),
    [page, query]
  )

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

  const paginateLinks = paginate && (
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

        {out.map((ayah) => (
          <SearchAyah ayah={ayah} mark={query} key={ayah.id} />
        ))}

        {paginateLinks}
      </ul>
    </MainLayout>
  )
}

export default Search
