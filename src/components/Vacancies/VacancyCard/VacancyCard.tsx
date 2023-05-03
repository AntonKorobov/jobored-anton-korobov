import styles from './VacancyCard.module.scss';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';

export function VacancyCard() {
  return (
    <Link className={styles.vacancyCard} href={'/'}>
      <h3 className={styles.title}>Менеджер-дизайнер</h3>
      <FavoriteButton isActive={false} />
      <div className={styles.info}>
        <div className={styles.salary}>
          <p>
            <b>з-п от 2000 byn</b>
          </p>
        </div>
        <div className={styles.type}>
          <p>Полный рабочий день</p>
        </div>
        <div className={styles.location}>
          <p>Icon</p>
          <p>Минск</p>
        </div>
      </div>
    </Link>
  );
}
