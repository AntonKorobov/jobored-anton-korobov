import styles from "@/styles/pages/Vacancies.module.scss";

import React from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { useGetVacancy } from "@/hooks/useGetVacancy";
import { VacancyCard } from "@/components/Vacancies/VacancyCard/VacancyCard";

export default function Vacancy() {
  const router = useRouter();
  const [data, error] = useGetVacancy({ id: Number(router.query.id) });

  return (
    <Layout>
      {data && (
        <div className={styles.vacancyPage}>
          <VacancyCard
            key={data.id}
            id={data.id}
            currency={data.currency}
            firm_name={data.firm_name}
            payment_from={data.payment_from}
            payment_to={data.payment_to}
            profession={data.profession}
            town={data.town}
            type_of_work={data.type_of_work}
            vacancyRichText={data.vacancyRichText}
          />
          <div
            className={styles.vacancyInfo}
            dangerouslySetInnerHTML={{ __html: data.vacancyRichText }}
          ></div>
        </div>
      )}
    </Layout>
  );
}
