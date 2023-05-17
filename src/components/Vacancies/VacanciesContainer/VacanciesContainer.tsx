import styles from "./VacanciesContainer.module.scss";

import React from "react";
import { VacancyCard } from "@/components/Vacancies/VacancyCard/VacancyCard";

import { IGetVacanciesResponse } from "@/types/apiSuperjobTypes";

interface IVacanciesContainer {
  data: IGetVacanciesResponse;
  favoritesVacanciesIds: { value: string };
  setFavoritesVacanciesIds: (value: string) => void;
}

export function VacanciesContainer({
  data,
  favoritesVacanciesIds,
  setFavoritesVacanciesIds,
}: IVacanciesContainer) {
  return (
    <div className={styles.vacanciesContainer}>
      {data.objects.map((item) => (
        <VacancyCard
          key={item.id}
          data={{
            id: item.id,
            currency: item.currency,
            firm_name: item.firm_name,
            payment_from: item.payment_from,
            payment_to: item.payment_to,
            profession: item.profession,
            town: item.town,
            type_of_work: item.type_of_work,
            vacancyRichText: item.vacancyRichText,
          }}
          isFavorite={item.id in favoritesVacanciesIds}
          setFavoritesVacanciesIds={setFavoritesVacanciesIds}
        />
      ))}
    </div>
  );
}
