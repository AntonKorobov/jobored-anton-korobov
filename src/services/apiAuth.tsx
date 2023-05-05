export const signIn = (apiURL: string, token: string) =>
  fetch(apiURL, { method: "GET", headers: { "x-secret-key": token } }).then(
    (res) => res.json()
  );
