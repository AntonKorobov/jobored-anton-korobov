import { useEffect } from "react";
import useSWR from "swr";

import { ISignInResponse } from "@/types/apiSuperjobTypes";
import { writeToLocalStorage } from "@/utils/writeToLocalStorage";
import { readFromLocalStorage } from "@/utils/readFromLocalStorage";

export interface IRefreshToken {
  access_token: string;
  refresh_token: string;
  client_id: string; //should be number?
  client_secret: string;
  token: string;
}

const refreshToken = (apiURL: string, token: string) =>
  fetch(apiURL, { method: "GET", headers: { "x-secret-key": token } }).then(
    (res) => res.json()
  );

export const useRefreshToken = () => {
  const logInData = { ...(readFromLocalStorage("logInData") as IRefreshToken) };

  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/refresh_token/?refresh_token=${logInData.refresh_token}&client_id=${logInData.client_id}&client_secret=${logInData.client_secret}`;
  const refreshInterval = 60000;

  const { data, error }: ISignInResponse = useSWR(
    logInData.refresh_token ? [url, logInData.token] : null,
    ([url, token]) => refreshToken(url, token),
    { refreshInterval: refreshInterval } //should be dynamic?
  );

  useEffect(() => {
    if (data) {
      console.log("token has been updated: ", data);
      writeToLocalStorage("logInData", {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        client_id: logInData.client_id.toString(),
        client_secret: logInData.client_secret,
        token: logInData.token,
      });
    } else if (error) {
      console.log(error.message);
    }
  }, [
    data,
    error,
    logInData.client_id,
    logInData.client_secret,
    logInData.token,
  ]);

  return [data, error];
};
