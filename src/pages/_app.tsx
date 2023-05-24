import "@/styles/global.scss";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { FavoritesVacanciesProvider } from "@/store/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, Arial, Tahoma, sans-serif",
      }}
    >
      <FavoritesVacanciesProvider>
        <Component {...pageProps} />
      </FavoritesVacanciesProvider>
    </MantineProvider>
  );
}
