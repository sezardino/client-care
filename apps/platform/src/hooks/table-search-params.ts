"use client";

import { LIMIT_SEARCH_PARAM, PAGE_SEARCH_PARAM } from "@/const/search-params";
import { getTableSearchParams } from "@/utils/get-table-search-params";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useGenerateSearchParamsUrl } from "./use-generate-search-params-url";

type Args = {
  pageSearchParam?: string;
  limitSearchParam?: string;
};

export const useTableSearchParams = (args?: Args) => {
  const {
    pageSearchParam = PAGE_SEARCH_PARAM,
    limitSearchParam = LIMIT_SEARCH_PARAM,
  } = args || {};
  const searchParams = useSearchParams();
  const router = useRouter();

  const { limit, page } = getTableSearchParams({
    limit: searchParams.get(limitSearchParam),
    page: searchParams.get(pageSearchParam),
  });

  const generatePathname = useGenerateSearchParamsUrl();

  const changeParamHandler = useCallback(
    (param: "limit" | "page" | string, value: string | number) => {
      const paramName =
        param === "limit" && limitSearchParam
          ? limitSearchParam
          : param === "page" && pageSearchParam
            ? pageSearchParam
            : param;

      router.push(generatePathname(paramName, value));
    },
    [generatePathname, limitSearchParam, pageSearchParam, router]
  );

  const getParam = useCallback(
    <T extends string | number>(
      key: string,
      defaultValue?: T
    ): T | undefined => {
      const value = searchParams.get(key);

      if (value === null) return defaultValue as T;

      if (typeof defaultValue === "number")
        return (Number(value) || defaultValue) as T;

      return (value || defaultValue) as T;
    },
    [searchParams]
  );

  const changePageHandler = useCallback(
    (page: number) => router.push(generatePathname(pageSearchParam, page)),
    [generatePathname, pageSearchParam, router]
  );

  const changeLimitHandler = useCallback(
    (limit: number) => router.push(generatePathname(limitSearchParam, limit)),
    [generatePathname, limitSearchParam, router]
  );

  return {
    page,
    limit,
    getParam,
    changeLimitHandler,
    changePageHandler,
    changeParamHandler,
  };
};
