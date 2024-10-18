import { DEFAULT_PAGE_LIMIT_PAGE } from "@/const/base";

type Args = {
  page?: number;
  limit?: number;
  count: number;
};

export const getBackendPagination = (args: Args) => {
  const { page = 1, limit = DEFAULT_PAGE_LIMIT_PAGE, count = 0 } = args;

  const transformedPage = Number(page) - 1;
  const transformedLimit = Number(limit);

  const totalPages = Math.ceil(count / limit);

  return {
    skip: transformedPage * transformedLimit,
    take: transformedLimit,
    meta: {
      totalPages: totalPages < 0 ? 0 : totalPages,
      page: transformedPage,
      limit: transformedLimit,
      count,
    },
  };
};
