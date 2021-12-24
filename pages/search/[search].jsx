import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

import MainLayout from "../../layouts/main.layout";
import Empty from "../../components/empty.component";

import SearchAyah from "../../components/search.ayah.component";

import Loading from "../../components/loader.component";

const Search = () => {
  const [paginate, setPaginate] = useState([]);
  const [out, setOut] = useState([]);

  const router = useRouter();

  const query = router.query.search;
  // const translator = router.query.t || 1;
  /*
    0 - start
    1 - not found
    2 - result 
    */

  const [page, setPage] = useState(1)
  const [empty, setEmpty] = useState(0);

  const getData = useCallback(async () => {
    const url = `https://mojkuran.com/api/search/${query}?page=${page}`;
    await fetch(url)
      .then((response) => response.json())
      .then(({ out, paginate }) => {
        if (out && out.length > 0) {
          setOut(out);
          setPaginate(paginate);
          setEmpty(2)
        } else setEmpty(1);
      })
  }, [page, query]);

  useEffect(() => {
    if (query && query.length > 2) {
      setPage(1)
      getData(1)
    }
  }, [query, getData]);

  if (empty === 1) {
    return (
      <MainLayout>
        <div className="row">
          <div className="col-sm-12 alert alert-danger">Riječ nije pronađena</div>
          <Empty alert="danger" />
        </div>
      </MainLayout>
    );
  }// else if (empty === 0) return <Loading />;

  const paginateLinks = 
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

  return (
    <MainLayout>
      <ul className="list-group list-group-flush col-12">
        {/* <li className="list-group-item text-right">
          <span className="badge badge-primary">{query}</span> pronađeno {paginate.total} rezultat(a)
        </li> */}

        {paginate && paginateLinks}

        {out.map((ayah) => (
          <SearchAyah ayah={ayah} mark={query} key={ayah.id} />
        ))}

        {paginate && paginateLinks}
      </ul>
    </MainLayout>
  );
};

export default Search;
