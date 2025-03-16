
export interface PaginationMeta_I {
  page: number;
  limit: number;
  total: number;
  lastPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function Pagination_meta(page: number, limit: number, total: number): PaginationMeta_I {

  const lastPage = Math.ceil(total / limit);
  const hasPrevious = page > 1;
  const hasNext = page < lastPage;

  return {
    page,
    limit,
    total,
    lastPage,
    hasPrevious,
    hasNext,
  };

}

export interface Pagination_I<T = []> {
  data: T[];
  meta: PaginationMeta_I;
}