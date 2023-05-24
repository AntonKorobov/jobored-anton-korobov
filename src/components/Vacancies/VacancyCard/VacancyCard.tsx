import styles from "./VacancyCard.module.scss";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";

import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { IGetVacancyResponse } from "@/types/apiSuperjobTypes";
import { setToLocalStorage } from "@/utils/setToLocalStorage";
import { getFromLocalStorage } from "@/utils/getFromLocalStorage";
import { FavoritesVacanciesContext } from "@/store/Context";

interface IVacancyCard {
  data: IGetVacancyResponse;
  className?: string;
}

export function VacancyCard({ data, className }: IVacancyCard) {
  function convertPaymentInfo(
    from: number | null,
    to: number | null,
    currency: string
  ) {
    if (from && !to) return `з-п ${from} ${currency}`;
    else if (from && to) return `з-п ${from} - ${to} ${currency}`;
    else return `з-п не указана`;
  }

  const { favoritesVacanciesIds, setFavoritesVacanciesIds } = useContext(
    FavoritesVacanciesContext
  );

  const addToFavoriteHandler = () => {
    const favoritesVacanciesIds = getFromLocalStorage("favoritesVacanciesIds");
    const indexOfId = favoritesVacanciesIds.indexOf(data.id);
    if (indexOfId === -1) {
      favoritesVacanciesIds.push(data.id);
    } else {
      delete favoritesVacanciesIds[indexOfId];
    }
    setToLocalStorage(
      "favoritesVacanciesIds",
      JSON.stringify(favoritesVacanciesIds.flat())
    );
    setFavoritesVacanciesIds(favoritesVacanciesIds);
  };

  return (
    <Link
      data-elem={`vacancy-${data.id}`}
      className={clsx(styles.vacancyCard, className && styles[className])}
      href={`/vacancies/${data.id}`}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{data.profession}</h3>
        <FavoriteButton
          dataAttribute={`vacancy-${data.id}-shortlist-button`}
          isActive={favoritesVacanciesIds.indexOf(data.id) !== -1}
          onClick={addToFavoriteHandler}
        />
      </div>
      <div className={styles.info}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.salary}>
              <b>
                {convertPaymentInfo(
                  data.payment_from,
                  data.payment_to,
                  data.currency
                )}
              </b>
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.type}> • {data.type_of_work.title}</p>
          </li>
          <li className={clsx(styles.item, styles.location)}>
            <Image
              src={"/icons/location.svg"}
              width={16}
              height={18}
              alt={""}
            />
            <p className={styles.locationName}>{data.town.title}</p>
          </li>
        </ul>
      </div>
    </Link>
  );
}
