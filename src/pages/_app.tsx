import "@/styles/global.scss";

import type { AppProps } from "next/app";
import { useRefreshToken } from "@/hooks/useRefreshToken";

export default function App({ Component, pageProps }: AppProps) {
  // useRefreshToken();

  return <Component {...pageProps} />;
}
