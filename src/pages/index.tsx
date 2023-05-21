import styles from "@/styles/pages/Home.module.scss";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { SignIn } from "@/components/SignIn/SignIn";
import { isUserSignedIn } from "@/utils/isUserSignedIn";
import { ISignInResponse } from "@/types/apiSuperjobTypes";

export default function Home() {
  const [signInData, setSignInData] = useState<ISignInResponse>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsSignedIn(isUserSignedIn());
  }, [signInData]);

  return (
    <Layout>
      <section className={styles.homePage}>
        <h2 className={styles.title}>Добро пожаловать на сайт!</h2>
        {isSignedIn ? (
          <p className={styles.message}>Вход выполнен успешно</p>
        ) : (
          <>
            <p className={styles.message}>Войдите чтобы продолжить</p>
            <SignIn setSignInData={setSignInData} />
          </>
        )}
      </section>
    </Layout>
  );
}
