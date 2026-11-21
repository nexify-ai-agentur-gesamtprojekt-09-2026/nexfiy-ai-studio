import { createServerFn } from "@tanstack/react-start";
import { katalogSuche, ladeKatalog } from "./teileklar-katalog";

export const getTeileklarKatalog = createServerFn({ method: "GET" })
  .validator(katalogSuche)
  .handler(({ data }) => ladeKatalog(data));
