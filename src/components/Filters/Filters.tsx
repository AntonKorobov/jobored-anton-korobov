import styles from "./Filters.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useGetCatalogues } from "@/hooks/useGetCatalogues";
import { NumberInput, Select } from "@mantine/core";

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
          <Select
            label="Отрасль"
            placeholder="Выберете отрасль"
            rightSection={
              <Image
                width={24}
                height={24}
                src={"/icons/arrow_down.svg"}
                alt="кнопка показать список отраслей"
              />
            }
            styles={{
              root: {
                marginBottom: "2rem",
              },
              rightSection: { pointerEvents: "none", paddingRight: "1.2rem" },
              input: {
                fontSize: "1.4rem",
                height: "4.2rem",
                borderRadius: "8px",
                padding: "0 1.2rem",
              },
              item: {
                fontSize: "1.4rem",
              },
              label: {
                fontSize: "1.6rem",
                fontWeight: 700,
                marginBottom: "0.8rem",
              },
            }}
            searchable
            nothingFound="Такой отрасли нет"
            maxDropdownHeight={280}
            data={
              data
                ? data.map((item) => ({
                    value: item.key.toString(),
                    label: item.title,
                  }))
                : []
            }
          />
          {/* <label className={styles.categoriesTitle}>Отрасль</label>
          <select className={styles.input} {...register("industry")}>
            <option hidden value="">
              Выберете отрасль
            </option>
            {data &&
              data.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.title}
                </option>
              ))}
          </select> */}
        </li>
        <li className={styles.item}>
          {/* <label className={styles.categoriesTitle}>Оклад</label>
          <input
            type="number"
            className={styles.input}
            placeholder="От"
            {...register("payment_from", { valueAsNumber: true })}
          /> */}
          <NumberInput
            placeholder="От"
            label="Оклад"
            min={0}
            step={1000}
            styles={{
              root: {
                marginBottom: "2rem",
              },
              rightSection: { paddingRight: "1.2rem" },
              control: {
                border: "none",
              },
              controlUp: {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
              input: {
                fontSize: "1.4rem",
                height: "4.2rem",
                borderRadius: "8px",
                padding: "0 1.2rem",
              },
              label: {
                fontSize: "1.6rem",
                fontWeight: 700,
                marginBottom: "0.8rem",
              },
            }}
          />
          <input
            type="number"
            className={styles.input}
            placeholder="До"
            {...register("payment_to", { valueAsNumber: true })}
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
