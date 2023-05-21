import { ISignInData, ISignInResponse } from "@/types/apiSuperjobTypes";
import { getFromLocalStorage } from "./getFromLocalStorage";
import { setToLocalStorage } from "./setToLocalStorage";
import { isUserSignedIn } from "./isUserSignedIn";

export const refreshToken = async () => {
  const logInData = { ...(getFromLocalStorage("SignInData") as ISignInData) };
  const isExpired = isUserSignedIn();
  if (!isExpired) {
    const url = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/refresh_token/?refresh_token=${logInData.refresh_token}&client_id=${logInData.client_id}&client_secret=${logInData.client_secret}`;
    const response: ISignInResponse = await fetch(url, {
      method: "GET",
      headers: { "x-secret-key": logInData.token },
    }).then((res) => res.json());
    setToLocalStorage(
      "logInData",
      JSON.stringify({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        client_id: logInData.client_id.toString(),
        client_secret: logInData.client_secret,
        token: logInData.token,
      })
    );
    console.log("token has been updated: ", response);
  }
};
