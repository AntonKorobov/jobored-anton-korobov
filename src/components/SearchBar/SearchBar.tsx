import styles from "./SearchBar.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

import Image from "next/image";
import { useRouter } from "next/router";
import { RefObject, useRef } from "react";

interface ISearch {
  searchBarInput: string;
  setSearchBarInput: (value: string) => void;
  submitFiltersRef?: RefObject<HTMLButtonElement>;
  submitSearchRef?: RefObject<HTMLButtonElement>;
}

export function SearchBar({
  searchBarInput,
  setSearchBarInput,
  submitFiltersRef,
  submitSearchRef,
}: ISearch) {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChangeSearchBar = (event: {
    target: { name?: string; value: string };
  }) => {
    router.replace(
      {
        pathname: "",
        query: {
          ...router.query,
          keyword: event.target.value,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const searchBarOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchBarRef.current) setSearchBarInput(searchBarRef.current.value);
    if (submitFiltersRef && submitFiltersRef.current)
      submitFiltersRef.current.click();
  };

  return (
    <form className={styles.searchBar} onSubmit={searchBarOnSubmit}>
      <Image
        className={styles.submitButtonImg}
        width={16}
        height={16}
        src="/icons/search.svg"
        alt="search button"
      />
      <input
        data-elem="search-input"
        className={styles.input}
        type="search"
        defaultValue={searchBarInput}
        ref={searchBarRef}
        placeholder="Введите название вакансии"
        name="keyword"
        onChange={handleChangeSearchBar}
      />
      <button
        ref={submitSearchRef}
        data-elem="search-button"
        className={clsx(utils.submitButton, styles.submitButton)}
        type="submit"
      >
        Поиск
      </button>
    </form>
  );
}
