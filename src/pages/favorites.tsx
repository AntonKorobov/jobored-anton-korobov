import styles from "@/styles/pages/Favorites.module.scss";

import { useContext, useState } from "react";

import Layout from "@/components/layout";
import { useGetVacancies } from "@/hooks/useGetVacancies";
import { FavoritesVacanciesContext } from "@/store/Context";
import router from "next/router";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import ReactPaginate from "react-paginate";
import { GetServerSideProps } from "next";

interface IVacancies {
  page: number;
}

export const getServerSideProps: GetServerSideProps<IVacancies> = async (
  context
) => {
  const page = Number(context.query?.page) || 0;

  return {
    props: {
      page,
    },
  };
};

export default function Favorites({ page }: IVacancies) {
  const MAX_API_ITEMS = 500;
  const itemsPerPage = 4;
  const maxPageNumber = MAX_API_ITEMS / itemsPerPage;

  const [currentPage, setCurrentPage] = useState(page);

  const { favoritesVacanciesIds } = useContext(FavoritesVacanciesContext);
  const [data, error] = useGetVacancies({
    ids: favoritesVacanciesIds,
    published: 1,
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
      <div className={styles.favoritesPage}>
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
          forcePage={currentPage}
          previousLabel="<"
          renderOnZeroPageCount={undefined}
        />
      </div>
    </Layout>
  );
}
