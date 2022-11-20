import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
