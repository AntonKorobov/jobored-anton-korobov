import styles from "@/styles/pages/Search.module.scss";

import React from "react";

import Layout from "@/components/layout";
import { VacanciesContainer } from "@/components/Vacancies/VacanciesContainer/VacanciesContainer";
import { VacancyCard } from "@/components/Vacancies/VacancyCard/VacancyCard";

export default function Search() {
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
