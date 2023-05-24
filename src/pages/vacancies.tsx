import styles from "@/styles/pages/Vacancies.module.scss";

import { useRef, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { useGetVacancies } from "@/hooks/useGetVacancies";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Filters } from "@/components/Filters/Filters";
import { Pagination } from "@/components/Pagination/Pagination";
import { Spinner } from "@/components/Spinner/Spinner";
import { EmptyState } from "@/components/EmptyState/EmptyState";

interface IVacancies {
  keyword: string;
  page: number;
  industry: number;
  payment_from: number;
  payment_to: number;
}

export const getServerSideProps: GetServerSideProps<{
  urlParams: IVacancies;
}> = async (context) => {

  const keyword = context.query?.keyword?.toString() || "";
  const page = Number(context.query?.page) - 1 || 0;
  const industry = Number(context.query?.industry) || 33;
  const payment_from = Number(context.query?.payment_from) || 0;
  const payment_to = Number(context.query?.payment_to) || 0;
  return {
    props: {
      urlParams: { keyword, page, industry, payment_from, payment_to },
    },
  };
};

export default function Vacancies({
  urlParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter();

  const [searchBarInput, setSearchBarInput] = useState(urlParams.keyword);
  const [currentPage, setCurrentPage] = useState(urlParams.page);
  const [industryFilter, setIndustryFilter] = useState(44);
  const [paymentFromFilter, setPaymentFromFilter] = useState(
    urlParams.payment_from
  );
  const [paymentToFilter, setPaymentToFilter] = useState(urlParams.payment_to);

  const submitFiltersRef = useRef<HTMLButtonElement>(null);
  const submitSearchRef = useRef<HTMLButtonElement>(null);

  const MAX_API_ITEMS = 500;
  const itemsPerPage = 4;
  const maxPageNumber = MAX_API_ITEMS / itemsPerPage;

  const [data, error, isLoading] = useGetVacancies({
    published: 1,
    keyword: searchBarInput,
    payment_from: paymentFromFilter,
    payment_to: paymentToFilter,
    catalogues: industryFilter,
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
        <div className={styles.controls}>
          <Filters
            submitFiltersRef={submitFiltersRef}
            submitSearchRef={submitSearchRef}
            setIndustryFilter={setIndustryFilter}
            setPaymentFromFilter={setPaymentFromFilter}
            setPaymentToFilter={setPaymentToFilter}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={styles.results}>
          <SearchBar
            submitFiltersRef={submitFiltersRef}
            submitSearchRef={submitSearchRef}
            searchBarInput={searchBarInput}
            setSearchBarInput={setSearchBarInput}
          />
          {isLoading && (
            <div className={styles.spinnerWrapper}>
              <Spinner />
            </div>
          )}
          {data && data?.objects.length === 0 && (
            <EmptyState isLinkButtonVisible={false} />
          )}
          {data && data?.objects.length > 0 && (
            <>
              <VacanciesContainer data={data} />
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
      </div>
    </Layout>
  );
}
