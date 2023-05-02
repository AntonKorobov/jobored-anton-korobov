import styles from './Header.module.scss';
import { clsx } from 'clsx';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} href="/">
          <Image className={styles.logoImg} src="/logo.svg" width={36} height={36} alt="site logo" />
          <h1 className={styles.logoTitle}>Jobored</h1>
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
      </div>
    </header>
  );
}
