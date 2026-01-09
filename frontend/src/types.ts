export interface Feed {
  feedId: string;
  name: string;
  key: string;
  createdAt: string;
}

export interface Source {
  sourceId: string;
  name: string;
  url: string;
  syncedAt: string | null;
  feedId: string;
}

export interface Entry {
  entryId: string;
  name: string;
  url: string;
  publisherId: string;
  publishedAt: string;
  author: string | null;
  sourceId: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
