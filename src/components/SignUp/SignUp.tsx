import React, { useEffect, useState } from "react";
import useSWR from "swr";

export function SignUp() {
  const fetcher = (apiURL: string, token: string) =>
    fetch(apiURL, { method: "GET", headers: { "x-secret-key": token } }).then(
      (res) => res.json()
    );

  const login = "sergei.stralenia@gmail.com";
  const password = "paralect123";
  const client_id = 2356;
  const client_secret =
    "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
  const hr = 0;
  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}&hr=${hr}`;
  const token = "GEU4nvd3rej*jeh.eqp";

  const [tryAuth, setTryAuth] = useState(false);

  const { data, error } = useSWR(
    tryAuth ? [url, token] : null,
    ([url, token]) => fetcher(url, token)
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <button onClick={() => setTryAuth(!tryAuth)}>Try Sign Up</button>;
}
