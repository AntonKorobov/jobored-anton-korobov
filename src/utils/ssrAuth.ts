import { ISignInData } from "@/types/apiSuperjobTypes";

export const ssrAuth = async (): Promise<ISignInData> => {
  const login = process.env.LOGIN || "";
  const password = process.env.PASSWORD || "";
  const client_id = Number(process.env.CLIENT_ID || 0);
  const client_secret = process.env.CLIENT_SECRET || "";
  const hr = 0;
  const token = process.env.TOKEN || "";

  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}&hr=${hr}`;
  const response: ISignInData = await fetch(url, {
    method: "GET",
    headers: { "x-secret-key": token },
  }).then((res) => res.json());
  return {
    access_token: response.access_token,
    refresh_token: response.refresh_token,
    client_id: client_id.toString(),
    client_secret,
    token,
  };
};
