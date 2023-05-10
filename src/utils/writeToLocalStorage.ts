export const writeToLocalStorage = (
  categoryName: string,
  data: { [value: string]: string }
) => {
  localStorage.setItem(categoryName, JSON.stringify(data));
};
