import { useState } from "react";
import { getFromLocalStorage } from "@/utils/getFromLocalStorage";
import { FavoritesVacanciesContext } from "./Context";

export function FavoritesVacanciesProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [favoritesVacanciesIds, setFavoritesVacanciesIds] = useState<number[]>(
    getFromLocalStorage("favoritesVacanciesIds") || []
  );

  return (
    <FavoritesVacanciesContext.Provider
      value={{ favoritesVacanciesIds, setFavoritesVacanciesIds }}
    >
      {children}
    </FavoritesVacanciesContext.Provider>
  );
}
