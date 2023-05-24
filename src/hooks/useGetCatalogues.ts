import useSWR from "swr";

import {
  IError,
  IGetCataloguesResponse,
} from "@/types/apiSuperjobTypes";

const getCatalogues = (apiURL: string) =>
  fetch(apiURL, {
    method: "GET",
  }).then((res) => res.json());

export function useGetCatalogues({ id }: { id: number }) {
  const url = `/api/catalogues/${id}`;

  const { data, error } = useSWR<IGetCataloguesResponse[], IError>(
    url, (url) => getCatalogues(url)
  );

  return [data, error] as const;
}
