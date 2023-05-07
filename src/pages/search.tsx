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
            {data
              ? data.objects.map((item) => (
                  <VacancyCard
                    key={item.id}
                    id={item.id}
                    currency={item.currency}
                    firm_name={item.firm_name}
                    payment_from={item.payment_from}
                    payment_to={item.payment_to}
                    profession={item.profession}
                    town={item.town}
                    type_of_work={item.type_of_work}
                  />
                ))
              : ""}
          </VacanciesContainer>
        </section>
        <section className={styles.section}>
          <h1>Pagination</h1>
        </section>
      </div>
    </Layout>
  );
}
