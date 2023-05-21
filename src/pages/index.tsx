import styles from "@/styles/pages/Home.module.scss";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { SignIn } from "@/components/SignIn/SignIn";
import { isUserSignedIn } from "@/utils/isUserSignedIn";
import { ISignInData, ISignInResponse } from "@/types/apiSuperjobTypes";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { setToLocalStorage } from "@/utils/setToLocalStorage";
import { ssrAuth } from "@/utils/ssrAuth";

export const getServerSideProps: GetServerSideProps<{
  response: ISignInData;
}> = async () => {
  const response = await ssrAuth();
  return { props: { response } };
};

export default function Home({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  setToLocalStorage("SignInData", JSON.stringify(response));

  const [signInData, setSignInData] = useState<ISignInResponse>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

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
