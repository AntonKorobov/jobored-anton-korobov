import styles from '@/styles/pages/Favorites.module.scss';

import React from 'react';

import Layout from '@/components/layout';

export default function Favorites() {
  return (
    <Layout>
      <div className={styles.favoritesPage}>Favorites</div>
    </Layout>
  );
}
