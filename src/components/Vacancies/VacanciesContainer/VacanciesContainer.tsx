import styles from "./VacanciesContainer.module.scss";

import React from "react";
import { VacancyCard } from "@/components/Vacancies/VacancyCard/VacancyCard";

import {
  IGetVacanciesResponse,
  IGetVacanciesResponseDataItem,
} from "@/types/apiSuperjobTypes";

interface IItems {
  currentItems: IGetVacanciesResponseDataItem[];
}

interface IVacanciesContainer {
  data: IGetVacanciesResponse;
}

function Items({ currentItems }: IItems) {
  return (
    <>
      {currentItems.map((item) => (
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
      ))}
    </>
  );
}

export function VacanciesContainer({ data }: IVacanciesContainer) {
  return (
    <div className={styles.vacanciesContainer}>
      <Items currentItems={data.objects} />
    </div>
  );
}
