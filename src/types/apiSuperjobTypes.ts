export interface ISignInResponse {
  data: {
    access_token: string;
    refresh_token: string;
    ttl: number;
    expires_in: number;
    token_type: string;
  };
  error: { code: number; message: string; error: string } | undefined;
}
