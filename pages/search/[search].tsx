import React, { useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/router"

import Pagination from "react-js-pagination"

import MainLayout from "../../layouts/main.layout"
import Empty from "../../components/empty.component"

import SearchAyah from "../../components/search.ayah.component"

import Loader from "../../components/loader.component"
import { PageStates } from "../../assets/types"

const Search = (): JSX.Element => {
  const [paginate, setPaginate] = useState<any>([])
  const [out, setOut] = useState([])
  const [pageState, setPageState] = useState(PageStates.INIT)
  const [page, setPage] = useState(1)

  const router = useRouter()
  const query = router.query.search?.toString()

  const getData = useCallback(async () => {
    const url = `https://mojkuran.com/api/search/${query}?page=${page}`
    await fetch(url)
      .then((response) => response.json())
      .then(({ out, paginate }) => {
        if (out?.length > 0) {
          setOut(out)
          setPaginate(paginate)

          setPageState(PageStates.SEARCH)
        } else {
          setPageState(PageStates.LOADING)
        }
      })
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

  const paginateLinks = useMemo(
    () => (
      <li className="list-group-item">
        <Pagination
          activePage={parseInt(paginate.currentPage)}
          itemsCountPerPage={parseInt(paginate.perPage)}
          totalItemsCount={parseInt(paginate.total)}
          pageRangeDisplayed={5}
          innerClass="pagination justify-content-center"
          itemClass="page-item"
          linkClass="page-link"
          onChange={setPage}
        />
      </li>
    ),
    [paginate]
  )

  return (
    <MainLayout>
      <ul className="list-group list-group-flush col-12">
        {paginate && paginateLinks}

        {out.map((ayah) => (
          <SearchAyah ayah={ayah} mark={query} key={ayah.id} />
        ))}

        {paginate && paginateLinks}
      </ul>
    </MainLayout>
  )
}

export default Search
