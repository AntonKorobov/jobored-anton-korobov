import styles from './VacancyCard.module.scss';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';

import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';

export function VacancyCard() {
  return (
    <Link className={styles.vacancyCard} href={'/'}>
      <div className={styles.header}>
        <h3 className={styles.title}>Менеджер-дизайнер</h3>
        <FavoriteButton isActive={false} />
      </div>
      <div className={styles.info}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.salary}>
              <b>з-п от 2000 byn</b>
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.type}> • Полный рабочий день</p>
          </li>
          <li className={clsx(styles.item, styles.location)}>
            <Image src={'/icons/location.svg'} width={16} height={18} alt={''} />
            <p className={styles.locationName}>Минск</p>
          </li>
        </ul>
      </div>
    </Link>
  );
}
