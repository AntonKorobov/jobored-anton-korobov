import { Dispatch, SetStateAction, createContext } from "react";

interface IFavoritesVacanciesContext {
  favoritesVacanciesIds: number[];
  setFavoritesVacanciesIds: Dispatch<SetStateAction<number[]>>;
}

export const FavoritesVacanciesContext =
  createContext<IFavoritesVacanciesContext>({
    favoritesVacanciesIds: [],
    setFavoritesVacanciesIds: () => {},
  });
