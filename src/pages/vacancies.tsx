import styles from "@/styles/pages/Vacancies.module.scss";

import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { useGetVacancies } from "@/hooks/useGetVacancies";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Filters } from "@/components/Filters/Filters";
import { Pagination } from "@/components/Pagination/Pagination";
import { Spinner } from "@/components/Spinner/Spinner";
import { refreshToken } from "@/utils/refreshToken";
import { ISignInData } from "@/types/apiSuperjobTypes";
import { getEnvVariables } from "@/utils/getEnvVeriables";
import { setToLocalStorage } from "@/utils/setToLocalStorage";

interface IVacancies {
  keyword: string;
  page: number;
  industry: number;
  payment_from: number;
  payment_to: number;
}

export const getServerSideProps: GetServerSideProps<{
  envVariables: ISignInData;
  urlParams: IVacancies;
}> = async (context) => {
  const envVariables = getEnvVariables();

  const keyword = context.query?.keyword?.toString() || "";
  const page = Number(context.query?.page) - 1 || 0;
  const industry = Number(context.query?.industry) || 33;
  const payment_from = Number(context.query?.payment_from) || 0;
  const payment_to = Number(context.query?.payment_to) || 0;
  return {
    props: {
      envVariables,
      urlParams: { keyword, page, industry, payment_from, payment_to },
    },
  };
};

export default function Vacancies({
  envVariables,
  urlParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    setToLocalStorage("SignInData", JSON.stringify(envVariables));
    (async () => {
      refreshToken();
    })();
  }, [envVariables]);

  const router = useRouter();

  const [searchBarInput, setSearchBarInput] = useState(urlParams.keyword);
  const [currentPage, setCurrentPage] = useState(urlParams.page);
  const [industryFilter, setIndustryFilter] = useState(urlParams.industry);
  const [paymentFromFilter, setPaymentFromFilter] = useState(
    urlParams.payment_from
  );
  const [paymentToFilter, setPaymentToFilter] = useState(urlParams.payment_to);

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
        {data && (
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
    </Layout>
  );
}
