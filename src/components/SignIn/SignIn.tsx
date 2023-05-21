import utilsStyles from "@/styles/utils.module.scss";
import styles from "./SignIn.module.scss";
import { clsx } from "clsx";

import { useEffect, useState } from "react";

import { useSignIn } from "@/hooks/useSignIn";
import { ISignInResponse } from "@/types/apiSuperjobTypes";
import { Spinner } from "@/components/Spinner/Spinner";

interface ISignIn {
  setSignInData: (data: ISignInResponse) => void;
}

export function SignIn({ setSignInData }: ISignIn) {
  const login = "sergei.stralenia@gmail.com";
  const password = "paralect123";
  const client_id = 2356;
  const client_secret =
    "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
  const hr = 0;
  const token = "GEU4nvd3rej*jeh.eqp";

  const [isSignInDataReady, setIsSignInDataReady] = useState(false);

  const [data, error, isLoading] = useSignIn({
    login,
    password,
    client_id,
    client_secret,
    hr,
    token,
    isSignInDataReady,
  });

  useEffect(() => {
    if (data) {
      setSignInData(data);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          className={clsx(styles.submitButton, utilsStyles.submitButton)}
          onClick={() => setIsSignInDataReady(!isSignInDataReady)}
        >
          Войти
        </button>
      )}
    </>
  );
}
