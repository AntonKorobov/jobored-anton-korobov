export const setToLocalStorage = (categoryName: string, data: string) => {
  localStorage.setItem(categoryName, data);
};
