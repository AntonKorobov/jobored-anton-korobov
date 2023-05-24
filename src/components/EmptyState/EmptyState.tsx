import styles from "./EmptyState.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import Link from "next/link";
import Image from "next/image";

interface EmptyState {
  isLinkButtonVisible?: boolean;
}

export function EmptyState({ isLinkButtonVisible = true }: EmptyState) {
  return (
    <div className={styles.emptyStateWrapper}>
      <Image
        src={"/images/empty_result.svg"}
        width={240}
        height={230.27}
        alt=""
      />
      <p className={styles.message}>Упс, здесь еще ничего нет!</p>
      {isLinkButtonVisible && (
        <button className={clsx(utils.linkButton, styles.goToPageButton)}>
          <Link href="/vacancies" className={styles.link}>
            Поиск вакансиий
          </Link>
        </button>
      )}
    </div>
  );
}
