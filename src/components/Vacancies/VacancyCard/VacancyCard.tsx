import styles from "./VacancyCard.module.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";

import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { IGetVacancyResponse } from "@/types/apiSuperjobTypes";

export function VacancyCard({
  id,
  payment_from,
  payment_to,
  profession,
  currency,
  type_of_work,
  town,
  firm_name,
  vacancyRichText,
}: IGetVacancyResponse) {
  function convertPaymentInfo(
    from: number | null,
    to: number | null,
    currency: string
  ) {
    if (from && !to) return `з-п ${from} ${currency}`;
    else if (from && to) return `з-п ${from} - ${to} ${currency}`;
    else return `з-п не указана`;
  }

  return (
    <Link className={styles.vacancyCard} href={`/vacancies/${id}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{profession}</h3>
        <FavoriteButton isActive={false} />
      </div>
      <div className={styles.info}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.salary}>
              <b>{convertPaymentInfo(payment_from, payment_to, currency)}</b>
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.type}> • {type_of_work.title}</p>
          </li>
          <li className={clsx(styles.item, styles.location)}>
            <Image
              src={"/icons/location.svg"}
              width={16}
              height={18}
              alt={""}
            />
            <p className={styles.locationName}>{town.title}</p>
          </li>
        </ul>
      </div>
    </Link>
  );
}
