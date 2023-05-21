export const setToLocalStorage = (categoryName: string, data: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(categoryName, data);
  }
};
