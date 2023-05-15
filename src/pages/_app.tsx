import "@/styles/global.scss";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { useRefreshToken } from "@/hooks/useRefreshToken";

export default function App({ Component, pageProps }: AppProps) {
  // useRefreshToken();

  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, Arial, Tahoma, sans-serif",
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
