import styles from "@/styles/pages/Home.module.scss";

import Layout from "@/components/layout";
import { SignIn } from "@/components/SignIn/SignIn";

export default function Home() {
  return (
    <Layout>
      <section className={styles.homePage}>
        <h1>Welcome to my site!</h1>
        <SignIn />
      </section>
    </Layout>
  );
}
