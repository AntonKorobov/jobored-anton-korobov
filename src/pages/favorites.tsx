import styles from "@/styles/pages/Favorites.module.scss";

import { useContext, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import router from "next/router";

import Layout from "@/components/layout";
import { useGetVacancies } from "@/hooks/useGetVacancies";
import { FavoritesVacanciesContext } from "@/store/Context";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { Pagination } from "@/components/Pagination/Pagination";
import { Spinner } from "@/components/Spinner/Spinner";
import { getEnvVariables } from "@/utils/getEnvVeriables";
import { EmptyState } from "@/components/EmptyState/EmptyState";

interface IVacancies {
  page: number;
}

export const getServerSideProps: GetServerSideProps<{
  urlParams: IVacancies;
}> = async (context) => {
  const envVariables = getEnvVariables();

  const page = Number(context.query?.page) - 1 || 0;
  return {
    props: {
      urlParams: { page },
    },
  };
};

export default function Favorites({
  urlParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const MAX_API_ITEMS = 500;
  const itemsPerPage = 4;
  const maxPageNumber = MAX_API_ITEMS / itemsPerPage;

  const [currentPage, setCurrentPage] = useState(urlParams.page);

  const { favoritesVacanciesIds } = useContext(FavoritesVacanciesContext);
  const [data, error, isLoading] = useGetVacancies({
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
        {isLoading && (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
        {data && data?.objects.length === 0 && <EmptyState />}
        {data && data?.objects.length > 0 && (
          <>
            <VacanciesContainer data={data} />{" "}
            <Pagination
              onPageChange={handlePageClick}
              pageCount={
                Math.ceil((data?.total || 0) / itemsPerPage) > maxPageNumber
                  ? maxPageNumber
                  : Math.ceil((data?.total || 0) / itemsPerPage)
              }
              forcePage={currentPage}
            />
          </>
        )}
      </div>
    </Layout>
  );
}
