import styles from "./Filters.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useGetCatalogues } from "@/hooks/useGetCatalogues";
import { NumberInputCustom } from "@/components/NumberInputCustom/NumberInputCustom";
import { SelectCustom } from "../SelectCustom/SelectCustom";

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
  const defaultValues = {
    industry: undefined,
    payment_from: undefined,
    payment_to: undefined,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFilters>({ defaultValues });

  const INDUSTRY_INDEX = 33;
  const [data, error] = useGetCatalogues({ id: INDUSTRY_INDEX });

  const onSubmit = (data: IFilters) => {
    setPaymentFromFilter(data.payment_from);
    setPaymentToFilter(data.payment_to);
    setCurrentPage(0);
    setIndustryFilter(data.industry);
  };

  const onReset = () => {
    reset();
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit(onSubmit)}>
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
          <SelectCustom data={data} />
        </li>
        <li className={styles.item}>
          <div className={styles.salaryWrapper}>
            <NumberInputCustom placeholder="От" label="Оклад" />
            <NumberInputCustom placeholder="До" />
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
