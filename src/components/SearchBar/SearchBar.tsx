import styles from "./SearchBar.module.scss";
import utils from "@/styles/utils.module.scss";
import clsx from "clsx";

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
    // event.preventDefault();
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
        className={styles.input}
        type="search"
        value={searchBarInput}
        placeholder="Введите название вакансии"
        name="keyword"
        onChange={handleChangeSearchBar}
      />
      <button
        className={clsx(utils.submitButton, styles.submitButton)}
        type="submit"
      >
        Поиск
      </button>
    </form>
  );
}
