"use client";

import styles from "@/styles/pages/Vacancies.module.scss";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { useGetVacancies } from "@/hooks/useGetVacancies";
import { SearchBar } from "@/components/SearchBar/SearchBar";

interface IVacancies {
  keyword: string;
  page: number;
}

export const getServerSideProps: GetServerSideProps<IVacancies> = async (
  context
) => {
  const keyword = context.query?.keyword?.toString() || "";
  const page = Number(context.query?.page) || 0;

  return {
    props: {
      keyword,
      page,
    },
  };
};

export default function Vacancies({ keyword, page }: IVacancies) {
  const router = useRouter();

  const [searchBarInput, setSearchBarInput] = useState(keyword);
  const [currentPage, setCurrentPage] = useState(page);

  const MAX_API_ITEMS = 500;
  const itemsPerPage = 4;
  const maxPageNumber = MAX_API_ITEMS / itemsPerPage;

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
    router.replace(
      {
        pathname: "",
        query: {
          ...router.query,
          page: event.selected + 1,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

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
          initialPage={currentPage}
          previousLabel="<"
          renderOnZeroPageCount={undefined}
        />
      </div>
    </Layout>
  );
}
