import styles from "./Spinner.module.scss";

import { Loader } from "@mantine/core";

export function Spinner() {
  return (
    <div className={styles.spinner}>
      <Loader size="xl" />
    </div>
  );
}
