import { seed } from "./seed.ts";

export const chohan = () => (seed() % 2 === 0 ? "丁" : "半");
