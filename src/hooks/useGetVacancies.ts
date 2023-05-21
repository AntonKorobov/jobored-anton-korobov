import { useEffect } from "react";
import useSWR from "swr";

import {
  IError,
  IGetVacanciesRequest,
  IGetVacanciesResponse,
} from "@/types/apiSuperjobTypes";
import { getFromLocalStorage } from "@/utils/getFromLocalStorage";
import { IRefreshToken } from "@/hooks/useRefreshToken";

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
  page,
  count,
  ids,
}: IGetVacanciesRequest) {
  const logInData = { ...(getFromLocalStorage("logInData") as IRefreshToken) };

  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=${
    published || ""
  }${keyword ? "&keyword=" + keyword : ""}${
    payment_from ? "&payment_from=" + payment_from : ""
  }${payment_to ? "&payment_to=" + payment_to : ""}${
    catalogues ? "&catalogues=" + catalogues : ""
  }&page=${page || 0}${count ? "&count=" + count : ""}${
    ids ? "&ids[]=" + ids.join("&ids[]=") : ""
  }`;

  const { data, error, isLoading } = useSWR<IGetVacanciesResponse, IError>(
    [url, logInData.token, logInData.client_secret],
    //@ts-ignore
    ([url, token, secretKey]) => getVacancies(url, token, secretKey)
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return [data, error, isLoading] as const;
}
