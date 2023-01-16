export type PaginationParams = {
  page: number;
  perPage: number;
};

export interface PaginationData<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
  data: T[];
}
