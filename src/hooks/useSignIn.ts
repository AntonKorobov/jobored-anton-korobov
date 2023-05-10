import { useEffect } from "react";
import useSWR from "swr";

import { IError, ISignInResponse } from "@/types/apiSuperjobTypes";
import { writeToLocalStorage } from "@/utils/writeToLocalStorage";

export interface IUseSignIn {
  login: string;
  password: string;
  client_id: number;
  client_secret: string;
  hr: 0;
  token: string;
  isSignInDataReady: boolean;
}

const signIn = (apiURL: string, token: string) =>
  fetch(apiURL, { method: "GET", headers: { "x-secret-key": token } }).then(
    (res) => res.json()
  );

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

  const { data, error } = useSWR<ISignInResponse, IError>(
    isSignInDataReady ? [url, token] : null,
    //@ts-ignore
    ([url, token]) => signIn(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false, //use useSWRImmutable?
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      writeToLocalStorage("logInData", {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        client_id: client_id.toString(),
        client_secret,
        token,
      });
    }
  }, [client_id, client_secret, data, token]);

  return [data, error];
};
