import { useEffect } from "react";
import useSWR from "swr";

import { signIn } from "@/services/apiAuth";

interface IUseSignIn {
  login: string;
  password: string;
  client_id: number;
  client_secret: string;
  hr: 0;
  token: string;
  isSignInDataReady: boolean;
}

export const useSignIn = ({
  login,
  password,
  client_id,
  client_secret,
  hr,
  token,
  isSignInDataReady,
}: IUseSignIn) => {
  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}&hr=${hr}`;

  const { data, error } = useSWR(
    isSignInDataReady ? [url, token] : null,
    ([url, token]) => signIn(url, token)
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      //set token to local storage
      //run refreshToken?!!!
    }
  }, [data]);

  return [data, error];
};
