import { queryOptions } from "@tanstack/react-query";
import {
  getCatalogProduct,
  listCatalogCategories,
  listCatalogProducts,
} from "./teileklar-catalog.functions";

export const catalogListQuery = (params: { q: string; category: string; page: number }) =>
  queryOptions({
    queryKey: ["teileklar-catalog", "list", params],
    queryFn: () => listCatalogProducts({ data: params }),
    staleTime: 5 * 60_000,
  });

export const catalogProductQuery = (id: string) =>
  queryOptions({
    queryKey: ["teileklar-catalog", "product", id],
    queryFn: () => getCatalogProduct({ data: { id } }),
    staleTime: 5 * 60_000,
  });

export const catalogCategoriesQuery = () =>
  queryOptions({
    queryKey: ["teileklar-catalog", "categories"],
    queryFn: () => listCatalogCategories(),
    staleTime: 10 * 60_000,
  });
