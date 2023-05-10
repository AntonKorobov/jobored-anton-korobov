export const readFromLocalStorage = (categoryName: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(categoryName) || "{}");
  }
};
