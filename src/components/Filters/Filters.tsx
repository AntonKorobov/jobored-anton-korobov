import styles from "./Filters.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useGetCatalogues } from "@/hooks/useGetCatalogues";

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFilters>();

  const router = useRouter();

  const INDUSTRY_INDEX = 33;
  const [data, error] = useGetCatalogues({ id: INDUSTRY_INDEX });

  const onSubmit = (data: IFilters) => {
    setPaymentFromFilter(data.payment_from);
    setPaymentToFilter(data.payment_to);
    setCurrentPage(0);
    setIndustryFilter(data.industry);

    router.replace(
      {
        pathname: "",
        query: {
          ...router.query,
          payment_from: data.payment_from,
          payment_to: data.payment_to,
          page: 1,
          industry: data.industry,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onReset = () => {
    reset(
      {
        payment_from: null,
        payment_to: null,
        industry: null,
      },
      {
        keepDefaultValues: true,
      }
    );
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
          <label className={styles.categoriesTitle}>Отрасль</label>
          <select
            className={styles.input}
            placeholder="Выберете отрасль"
            defaultValue={industry || null}
            {...register("industry")}
          >
            {data &&
              data.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.title}
                </option>
              ))}
          </select>
        </li>
        <li className={styles.item}>
          <label className={styles.categoriesTitle}>Оклад</label>
          <input
            type="number"
            className={styles.input}
            placeholder="От"
            defaultValue={payment_from || null}
            {...register("payment_from")}
          />
          <input
            type="number"
            className={styles.input}
            placeholder="До"
            defaultValue={payment_to || null}
            {...register("payment_to")}
          />
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
