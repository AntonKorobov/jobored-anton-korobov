import styles from "@/styles/pages/Home.module.scss";

import Layout from "@/components/layout";

export default function Home() {

  return (
    <Layout>
      <section className={styles.homePage}>
        <h2 className={styles.title}>Добро пожаловать на сайт!</h2>
        <p className={styles.message}>Вход выполнен автоматически</p>
      </section>
    </Layout>
  );
}
