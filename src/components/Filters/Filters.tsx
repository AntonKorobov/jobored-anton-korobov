import styles from "./Filters.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import React from "react";
import Image from "next/image";
// import { useForm } from "react-hook-form";
import { useForm } from "@mantine/form";
import { useGetCatalogues } from "@/hooks/useGetCatalogues";
import { NumberInputCustom } from "@/components/NumberInputCustom/NumberInputCustom";
import { SelectCustom } from "../SelectCustom/SelectCustom";
import { TextInput } from "@mantine/core";

interface IFilters {
  industry: number;
  setIndustryFilter: (value: number) => void;
  payment_from: number;
  setPaymentFromFilter: (value: number) => void;
  payment_to: number;
  setPaymentToFilter: (value: number) => void;
  setCurrentPage: (value: number) => void;
}

export function Filters({
  industry,
  setIndustryFilter,
  payment_from,
  setPaymentFromFilter,
  payment_to,
  setPaymentToFilter,
  setCurrentPage,
}: IFilters) {
  const formFilters = useForm({
    initialValues: {
      industry: undefined,
      payment_from: undefined,
      payment_to: undefined,
    },
  });

  const INDUSTRY_INDEX = 33;
  const [data, error] = useGetCatalogues({ id: INDUSTRY_INDEX });

  // const onSubmit = (data: IFilters) => {
  //   console.log(data);

  //   setPaymentFromFilter(data.payment_from);
  //   setPaymentToFilter(data.payment_to);
  //   setCurrentPage(0);
  //   setIndustryFilter(data.industry);
  // };

  const onReset = () => {
    formFilters.reset();
  };

  return (
    <form
      className={styles.filters}
      onSubmit={formFilters.onSubmit((values) => console.log(values))}
    >
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
            // {...formFilters.getInputProps("industry")}
          />
        </li>
        <li className={styles.item}>
          <div className={styles.salaryWrapper}>
            <NumberInputCustom
              placeholder="От"
              label="Оклад"
              valueName="payment_from"
              form={formFilters}
              // {...formFilters.getInputProps("payment_from")}
            />
            <NumberInputCustom
              placeholder="До"
              valueName="payment_to"
              form={formFilters}
              // {...formFilters.getInputProps("payment_to")}
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
