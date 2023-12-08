import { fetchService } from "~/services/fetch/client";
import { createSearchParams } from "~/utils/utils";
import type { ItemQuery } from "./items.query";
import type { ItemListSchema } from "./items.model";

export const getItemsApi = async (query?: ItemQuery) => {
  const searchParams = createSearchParams(query);
  const params = fetchService.getSearchParams(
    fetchService.defineApis.ITEMS.ROOT,
    searchParams
  );
  const response = await fetchService.get(params);
  return await fetchService.toJson<ItemListSchema>(response);
};
