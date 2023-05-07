import styles from "@/styles/pages/Search.module.scss";

import React from "react";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { VacancyCard } from "@/components/Vacancies/VacancyCard/VacancyCard";
import { useGetVacancies } from "@/hooks/useGetVacancies";

export default function Search() {
  const [data, error] = useGetVacancies({
    published: 1,
    keyword: "",
    payment_from: 10000,
    payment_to: 100000,
    catalogues: 33,
  });

  return (
    <Layout>
      <div className={styles.searchPage}>
        <section className={styles.section}>
          <h1>Filters</h1>
        </section>
        <section className={styles.section}>
          <h1>Search</h1>
        </section>
        <section className={styles.section}>
          <VacanciesContainer>
            <VacancyCard />
            <VacancyCard />
            <VacancyCard />
            <VacancyCard />
          </VacanciesContainer>
        </section>
        <section className={styles.section}>
          <h1>Pagination</h1>
        </section>
      </div>
    </Layout>
  );
}
