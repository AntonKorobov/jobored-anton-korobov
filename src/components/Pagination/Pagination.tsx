import styles from "./Pagination.module.scss";

import ReactPaginate from "react-paginate";

interface IPagination {
  onPageChange: (event: { selected: number }) => void;
  pageCount: number;
  forcePage: number;
}

export function Pagination({
  onPageChange,
  pageCount,
  forcePage,
}: IPagination) {
  return (
    <ReactPaginate
      containerClassName={styles.paginationContainer}
      pageClassName={styles.paginationItem}
      pageLinkClassName={styles.paginationPageLink}
      previousLinkClassName={styles.paginationButton}
      nextLinkClassName={styles.paginationButton}
      activeLinkClassName={styles.paginationActivePageLink}
      disabledLinkClassName={styles.paginationDisabledPageLink}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      forcePage={forcePage}
      previousLabel="<"
      renderOnZeroPageCount={undefined}
    />
  );
}
