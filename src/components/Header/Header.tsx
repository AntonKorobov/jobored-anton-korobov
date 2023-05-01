import styles from './Header.module.scss';
import { clsx } from 'clsx';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image src="/logo.svg" width={30} height={30} alt="site logo" />
        <h1 className={clsx(styles.h1, styles.logoTitle)}>Jobored</h1>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/search">Поиск вакансиий</Link>
          </li>
          <li className={styles.item}>
            <Link href="/favorites">Избранное</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
