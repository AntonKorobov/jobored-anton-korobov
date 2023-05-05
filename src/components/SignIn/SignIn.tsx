import React, { useState } from "react";

import { useSignIn } from "@/hooks/useSignIn";

export function SignIn() {
  const login = "sergei.stralenia@gmail.com";
  const password = "paralect123";
  const client_id = 2356;
  const client_secret =
    "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
  const hr = 0;
  const url = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}&hr=${hr}`;
  const token = "GEU4nvd3rej*jeh.eqp";

  const [isSignInDataReady, setIsSignInDataReady] = useState(false);

  const [data, error] = useSignIn({
    login,
    password,
    client_id,
    client_secret,
    hr,
    token,
    isSignInDataReady,
  });

  return (
    <button onClick={() => setIsSignInDataReady(!isSignInDataReady)}>
      Try Sign In
    </button>
  );
}
