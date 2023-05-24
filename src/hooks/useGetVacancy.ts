import { useEffect } from "react";
import useSWR from "swr";

import {
  IError,
  IGetVacancyRequest,
  IGetVacancyResponse,
} from "@/types/apiSuperjobTypes";

const getVacancy = (apiURL: string) =>
  fetch(apiURL, {
    method: "GET",
  }).then((res) => res.json());

export function useGetVacancy({ id }: IGetVacancyRequest) {
  const url = `/api/vacancies/${id}/`;

  const { data, error, isLoading } = useSWR<IGetVacancyResponse, IError>(
    url, (url) => getVacancy(url)
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return [data, error, isLoading] as const;
}
