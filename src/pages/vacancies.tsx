import styles from "@/styles/pages/Vacancies.module.scss";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { useGetVacancies } from "@/hooks/useGetVacancies";

export default function Search() {
  const MAX_API_ITEMS = 500;
  const itemsPerPage = 4;
  const maxPageNumber = MAX_API_ITEMS / itemsPerPage;
  const [currentPage, setCurrentPage] = useState(0);

  const [data, error] = useGetVacancies({
    published: 1,
    keyword: "",
    payment_from: 10000,
    payment_to: 100000,
    catalogues: 33,
    page: currentPage,
    count: itemsPerPage,
  });

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <Layout>
      <div className={styles.searchPage}>
        <section className={styles.section}>
          <h1>Filters</h1>
        </section>
        <section className={styles.section}>
          <h1>Search</h1>
        </section>
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
