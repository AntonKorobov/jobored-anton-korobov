import styles from "@/styles/pages/Vacancies.module.scss";

import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { useGetVacancies } from "@/hooks/useGetVacancies";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Filters } from "@/components/Filters/Filters";
import { Pagination } from "@/components/Pagination/Pagination";
import { Spinner } from "@/components/Spinner/Spinner";

interface IVacancies {
  keyword: string;
  page: number;
  industry: number;
  payment_from: number;
  payment_to: number;
}

export const getServerSideProps: GetServerSideProps<IVacancies> = async (
  context
) => {
  const keyword = context.query?.keyword?.toString() || "";
  const page = Number(context.query?.page) - 1 || 0;
  const industry = Number(context.query?.industry) || 0;
  const payment_from = Number(context.query?.payment_from) || 0;
  const payment_to = Number(context.query?.payment_to) || 0;

  return {
    props: {
      keyword,
      page,
      industry,
      payment_from,
      payment_to,
    },
  };
};

export default function Vacancies({
  keyword,
  page,
  industry,
  payment_from,
  payment_to,
}: IVacancies) {
  const router = useRouter();

  const [searchBarInput, setSearchBarInput] = useState(keyword);
  const [currentPage, setCurrentPage] = useState(page);
  const [industryFilter, setIndustryFilter] = useState(industry);
  const [paymentFromFilter, setPaymentFromFilter] = useState(payment_from);
  const [paymentToFilter, setPaymentToFilter] = useState(payment_to);

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
        <Filters
          setIndustryFilter={setIndustryFilter}
          setPaymentFromFilter={setPaymentFromFilter}
          setPaymentToFilter={setPaymentToFilter}
          setCurrentPage={setCurrentPage}
        />
        <SearchBar
          searchBarInput={searchBarInput}
          setSearchBarInput={setSearchBarInput}
        />
        {isLoading && (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
        {data && <VacanciesContainer data={data} />}
        <Pagination
          onPageChange={handlePageClick}
          pageCount={
            Math.ceil((data?.total || 0) / itemsPerPage) > maxPageNumber
              ? maxPageNumber
              : Math.ceil((data?.total || 0) / itemsPerPage)
          }
          forcePage={currentPage}
        />
      </div>
    </Layout>
  );
}
