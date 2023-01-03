declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      NEXT_PUBLIC_MAPBOX_TOKEN: string;
      NEXT_PUBLIC_CESIUM_ION_TOKEN: string;
    }
  }
}

export {};
