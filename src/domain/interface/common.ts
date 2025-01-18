export interface IPagination {
  totalCount: number;
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
}
