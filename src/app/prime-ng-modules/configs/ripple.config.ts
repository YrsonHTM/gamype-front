import { PrimeNGConfig } from "primeng/api";

export const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
    primeConfig.ripple = true;
  };