"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useGenerateSearchParamsUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (paramName: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);

      params.set(
        paramName,
        typeof value === "undefined" ? "" : value.toString()
      );

      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );
};
