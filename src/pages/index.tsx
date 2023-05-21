import styles from "@/styles/pages/Home.module.scss";

import { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Layout from "@/components/layout";
import { ISignInData } from "@/types/apiSuperjobTypes";
import { setToLocalStorage } from "@/utils/setToLocalStorage";
import { refreshToken } from "@/utils/refreshToken";
import { getEnvVariables } from "@/utils/getEnvVeriables";

export const getServerSideProps: GetServerSideProps<{
  envVariables: ISignInData;
}> = async () => {
  const envVariables = getEnvVariables();
  return {
    props: { envVariables },
  };
};

export default function Home({
  envVariables,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    setToLocalStorage("SignInData", JSON.stringify(envVariables));
    (async () => {
      refreshToken();
    })();
  }, [envVariables]);

  return (
    <Layout>
      <section className={styles.homePage}>
        <h2 className={styles.title}>Добро пожаловать на сайт!</h2>
        <p className={styles.message}>Вход выполнен автоматически</p>
      </section>
    </Layout>
  );
}
