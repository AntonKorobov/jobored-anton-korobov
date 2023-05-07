import { useEffect } from "react";
import useSWR from "swr";

import {
  IError,
  IGetVacanciesRequest,
  IGetVacanciesResponse,
} from "@/types/apiSuperjobTypes";
import { readFromLocalStorage } from "@/utils/readFromLocalStorage";
import { IRefreshToken } from "./useRefreshToken";

const getVacancies = (apiURL: string, token: string, secretKey: string) =>
  fetch(apiURL, {
    method: "GET",
    headers: { "x-secret-key": token, "X-Api-App-Id": secretKey },
  }).then((res) => res.json());

export function useGetVacancies({
  published,
  keyword,
  payment_from,
  payment_to,
  catalogues,
}: IGetVacanciesRequest) {
  const logInData = { ...(readFromLocalStorage("logInData") as IRefreshToken) };

  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=${published}&keyword=${keyword}&payment_from=${payment_from}&payment_to=${payment_to}&catalogues=${catalogues}`;

  const { data, error } = useSWR<IGetVacanciesResponse, IError>(
    [url, logInData.token, logInData.client_secret],
    //@ts-ignore
    ([url, token, secretKey]) => getVacancies(url, token, secretKey)
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return [data, error] as const;
}
