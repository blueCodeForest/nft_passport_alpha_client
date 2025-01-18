import { IPagination } from 'src/domain/interface/common';

export function paginationAdapter(data: unknown): IPagination {
  if (!isPaginationData(data)) {
    throw new Error('invalid pagination data');
  }

  return {
    totalCount: data.totalCount,
    currentPage: data.currentPage,
    perPage: data.perPage,
    hasNextPage: data.hasNextPage,
    hasPrevPage: data.hasPrevPage,
    totalPages: data.totalPages,
  };
}

function isPaginationData(data: unknown): data is IPagination {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const pagination = data as Partial<IPagination>;

  return (
    typeof pagination.totalCount === 'number' &&
    typeof pagination.currentPage === 'number' &&
    typeof pagination.perPage === 'number' &&
    typeof pagination.hasNextPage === 'boolean' &&
    typeof pagination.hasPrevPage === 'boolean' &&
    typeof pagination.totalPages === 'number' &&
    pagination.currentPage > 0 &&
    pagination.perPage > 0 &&
    pagination.totalCount >= 0 &&
    pagination.totalPages >= 0
  );
}
