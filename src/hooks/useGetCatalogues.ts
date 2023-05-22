import { useEffect } from "react";
import useSWR from "swr";

import {
  IError,
  IGetCataloguesResponse,
  ISignInData,
} from "@/types/apiSuperjobTypes";
import { getFromLocalStorage } from "@/utils/getFromLocalStorage";

const getCatalogues = (apiURL: string, token: string, secretKey: string) =>
  fetch(apiURL, {
    method: "GET",
    headers: { "x-secret-key": token, "X-Api-App-Id": secretKey },
  }).then((res) => res.json());

export function useGetCatalogues({ id }: { id: number }) {
  const logInData = { ...(getFromLocalStorage("SignInData") as ISignInData) };

  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/parent/${id}/`;

  const { data, error } = useSWR<IGetCataloguesResponse[], IError>(
    [url, logInData.token, logInData.client_secret],
    //@ts-ignore
    ([url, token, secretKey]) => getCatalogues(url, token, secretKey)
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return [data, error] as const;
}
