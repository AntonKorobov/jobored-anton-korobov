import { useEffect } from "react";
import useSWR from "swr";

import {
  IError,
  IGetVacancyRequest,
  IGetVacancyResponse,
} from "@/types/apiSuperjobTypes";
import { readFromLocalStorage } from "@/utils/readFromLocalStorage";
import { IRefreshToken } from "@/hooks/useRefreshToken";

const getVacancy = (apiURL: string, token: string, secretKey: string) =>
  fetch(apiURL, {
    method: "GET",
    headers: { "x-secret-key": token, "X-Api-App-Id": secretKey },
  }).then((res) => res.json());

export function useGetVacancy({ id }: IGetVacancyRequest) {
  const logInData = { ...(readFromLocalStorage("logInData") as IRefreshToken) };

  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${id}`;

  const { data, error } = useSWR<IGetVacancyResponse, IError>(
    [url, logInData.token, logInData.client_secret],
    //@ts-ignore
    ([url, token, secretKey]) => getVacancy(url, token, secretKey)
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return [data, error] as const;
}
