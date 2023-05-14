import styles from "./Filters.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface IFilters {
  industry: string;
  payment_from: number;
  setPaymentFromFilter: (value: number) => void;
  payment_to: number;
  setPaymentToFilter: (value: number) => void;
  setCurrentPage: (value: number) => void;
}

export function Filters({
  industry,
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
  } = useForm<IFilters>();

  const router = useRouter();

  const onSubmit = (data: IFilters) => {
    setPaymentFromFilter(data.payment_from);
    setPaymentToFilter(data.payment_to);

    router.replace(
      {
        pathname: "",
        query: {
          ...router.query,
          payment_from: data.payment_from,
          payment_to: data.payment_to,
          page: 1,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
    setCurrentPage(0);
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h3 className={styles.title}>Фильтры</h3>
        <button className={styles.resetButton}>
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
          <h4 className={styles.categoriesTitle}>Отрасль</h4>
          <select id="cars" {...register("industry")}>
            <option value="first" defaultChecked>
              1
            </option>
            <option value="second">2</option>
            <option value="third">3</option>
          </select>
        </li>
        <li className={styles.item}>
          <h4 className={styles.categoriesTitle}>Оклад</h4>
          <input
            defaultValue={payment_from}
            {...register("payment_from", { required: true })}
          />
          {errors.payment_from && <span>This field is required</span>}
          <input
            defaultValue={payment_to}
            {...register("payment_to", { required: true })}
          />
          {errors.payment_to && <span>This field is required</span>}
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
