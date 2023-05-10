import styles from "./SearchBar.module.scss";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface ISearch {
  searchBarInput: string;
  setSearchBarInput: (value: string) => void;
}

export function SearchBar({ searchBarInput, setSearchBarInput }: ISearch) {
  const router = useRouter();

  const handleChangeSearchBar = (event: {
    target: { name?: string; value: string };
  }) => {
    setSearchBarInput(event.target.value);
    router.push(
      {
        pathname: "/vacancies",
        query: { keyword: event.target.value },
      },
      undefined,
      { shallow: true }
    );
  };

  const searchBarOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.searchBar} onSubmit={searchBarOnSubmit}>
      <input
        className={styles.input}
        type="search"
        value={searchBarInput}
        placeholder="Введите название вакансии"
        name="keyword"
        onChange={handleChangeSearchBar}
      />
      <button className={styles.submitButton} type="submit">
        <Image
          className={styles.submitButtonImg}
          width={16}
          height={16}
          src="/icons/search.svg"
          alt="search button"
        />
      </button>
    </form>
  );
}
