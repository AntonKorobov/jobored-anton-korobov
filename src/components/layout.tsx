import styles from './layout.module.scss';

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header/Header';

export const siteTitle = 'Jobored';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Anton Korobov App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
