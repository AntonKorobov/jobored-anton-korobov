import styles from './VacanciesContainer.module.scss';

import React, { ReactNode } from 'react';

export function VacanciesContainer({ children }: { children: ReactNode }) {
  return <div className={styles.vacanciesContainer}>{children}</div>;
}
