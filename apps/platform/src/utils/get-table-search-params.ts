import { DEFAULT_PAGE_LIMIT_PAGE } from "@/const/base";
import { LIMIT_SEARCH_PARAM, PAGE_SEARCH_PARAM } from "@/const/search-params";

type SearchParams = {
  [PAGE_SEARCH_PARAM]?: string | null;
  [LIMIT_SEARCH_PARAM]?: string | null;
};

export const getTableSearchParams = ({ limit, page }: SearchParams) => ({
  page: Number(page) || 1,
  limit: Number(limit) || DEFAULT_PAGE_LIMIT_PAGE,
});
