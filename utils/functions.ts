import { HashObject } from "./types";

export const getHashObject = (hash: string): HashObject => {
  return hash
    .substring(1)
    .split("&")
    .reduce(
      (prev, curr) => ({ ...prev, [curr.split("=")[0]]: curr.split("=")[1] }),
      {}
    );
};

export function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}
