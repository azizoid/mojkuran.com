import { useEffect, useState, useCallback, ReactElement } from "react"
import { useRouter } from "next/router"

import Pagination from "react-js-pagination"

import { MainLayout } from "../../layouts/MainLayout"
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
      .then(({ out, paginate, success }) => {
        if (success === true) {
          setOut(out)
          setPaginate({
            ...paginate,
            currentPage: Number(paginate.currentPage),
          })
          setPageState(PageStates.SEARCH)
        } else throw new Error("not found")
      })
      .catch(() => setPageState(PageStates.NOT_FOUND))
  }, [page, query])

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    getData()
  }, [getData])

  if (pageState === PageStates.NOT_FOUND) {
    return (
      <div className="col-sm-12 alert alert-danger">Riječ nije pronađena</div>
    )
  }

  if (pageState === PageStates.LOADING) {
    return <Loader />
  }

  const paginateLinks = paginate?.total > paginate?.perPage && (
    <li className="list-group-item">
      <Pagination
        activePage={paginate.currentPage}
        itemsCountPerPage={paginate.perPage}
        totalItemsCount={paginate.total}
        pageRangeDisplayed={5}
        innerClass="pagination"
        itemClass="pagination-item"
        activeClass="pagination-active"
        onChange={setPage}
        hideDisabled={true}
      />
    </li>
  )

  return (
    <>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        {paginateLinks}

        {out?.map((ayah) => (
          <SearchAyah ayah={ayah} mark={query} key={ayah.id} />
        ))}

        {paginateLinks}
      </ul>
    </>
  )
}

Search.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Search
