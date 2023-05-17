import styles from "./Filters.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import React from "react";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { useGetCatalogues } from "@/hooks/useGetCatalogues";
import { NumberInputCustom } from "@/components/NumberInputCustom/NumberInputCustom";
import { SelectCustom } from "../SelectCustom/SelectCustom";

interface IFilters {
  setIndustryFilter: (value: number) => void;
  setPaymentFromFilter: (value: number) => void;
  setPaymentToFilter: (value: number) => void;
  setCurrentPage: (value: number) => void;
}

interface IFormData {
  industry: number | "";
  payment_from: number | "";
  payment_to: number | "";
}

export function Filters({
  setIndustryFilter,
  setPaymentFromFilter,
  setPaymentToFilter,
  setCurrentPage,
}: IFilters) {
  const formFilters = useForm<IFormData>({
    initialValues: {
      industry: "",
      payment_from: "",
      payment_to: "",
    },
  });

  const INDUSTRY_INDEX = 33;
  const [data, error] = useGetCatalogues({ id: INDUSTRY_INDEX });

  const onSubmit = formFilters.onSubmit((data) => {
    console.log(data);

    setPaymentFromFilter(data.payment_from ? data.payment_from : 0);
    setPaymentToFilter(data.payment_to ? data.payment_to : 0);
    setCurrentPage(0);
    setIndustryFilter(data.industry ? data.industry : 0);
  });

  const onReset = () => {
    formFilters.reset();
  };

  return (
    <form className={styles.filters} onSubmit={onSubmit}>
      <div className={styles.header}>
        <h3 className={styles.title}>Фильтры</h3>
        <button className={styles.resetButton} onClick={onReset}>
          <span>Сбросить все</span>
          <Image
            className={styles.crossIcon}
            width={16}
            height={16}
            src="/icons/cross.svg"
            alt="search button"
          />
        </button>
      </div>
      <ul className={styles.categories}>
        <li className={styles.item}>
          <SelectCustom
            data={data}
            form={formFilters}
            valueName="industry"
            label="Отрасль"
            placeholder="Выберете отрасль"
            nothingFound="Такой отрасли нет"
          />
        </li>
        <li className={styles.item}>
          <div className={styles.salaryWrapper}>
            <NumberInputCustom
              placeholder="От"
              label="Оклад"
              valueName="payment_from"
              form={formFilters}
              step={1000}
            />
            <NumberInputCustom
              placeholder="До"
              valueName="payment_to"
              form={formFilters}
              step={1000}
            />
          </div>
        </li>
      </ul>
      <button
        className={clsx(utils.submitButton, styles.submitButton)}
        type="submit"
      >
        Применить
      </button>
    </form>
  );
}
