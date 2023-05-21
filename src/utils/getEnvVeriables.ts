import { ISignInData } from "@/types/apiSuperjobTypes";

export const getEnvVariables = (): ISignInData => {
  const access_token = process.env.ACCESS_TOKEN || "";
  const refresh_token = process.env.REFRESH_TOKEN || "";
  const client_id = Number(process.env.CLIENT_ID || 0);
  const client_secret = process.env.CLIENT_SECRET || "";
  const token = process.env.TOKEN || "";

  return {
    access_token,
    refresh_token,
    client_id: client_id.toString(),
    client_secret,
    token,
  };
};
