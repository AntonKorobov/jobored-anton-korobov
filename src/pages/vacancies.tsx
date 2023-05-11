import styles from "@/styles/pages/Vacancies.module.scss";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { useGetVacancies } from "@/hooks/useGetVacancies";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { keyword } = router.query;

  const [searchBarInput, setSearchBarInput] = useState("");

  const MAX_API_ITEMS = 500;
  const itemsPerPage = 4;
  const maxPageNumber = MAX_API_ITEMS / itemsPerPage;
  const [currentPage, setCurrentPage] = useState(0);

  const [data, error] = useGetVacancies({
    published: 1,
    keyword: searchBarInput,
    payment_from: 10000,
    payment_to: 100000,
    catalogues: 33,
    page: currentPage,
    count: itemsPerPage,
  });

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    setSearchBarInput(keyword?.toString() || "");
  }, [keyword]);

  return (
    <Layout>
      <div className={styles.searchPage}>
        <section className={styles.section}>
          <h1>Filters</h1>
        </section>
        <SearchBar
          searchBarInput={searchBarInput}
          setSearchBarInput={setSearchBarInput}
        />
        {data && <VacanciesContainer data={data} />}
        <ReactPaginate
          containerClassName={styles.paginationContainer}
          pageClassName={styles.paginationItem}
          pageLinkClassName={styles.paginationPageLink}
          previousClassName={styles.paginationButton}
          nextClassName={styles.paginationButton}
          activeLinkClassName={styles.paginationActivePageLink}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={
            Math.ceil((data?.total || 0) / itemsPerPage) > maxPageNumber
              ? maxPageNumber
              : Math.ceil((data?.total || 0) / itemsPerPage)
          }
          previousLabel="<"
          renderOnZeroPageCount={undefined}
        />
      </div>
    </Layout>
  );
}
