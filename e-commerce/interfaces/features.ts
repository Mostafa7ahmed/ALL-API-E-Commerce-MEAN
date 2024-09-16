export interface QueryString {
  readonly sort?: string;
  readonly fields?: string;
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
  [key: string]: any;
}

export interface SearchQuery {
  $or?: Array<{ [key: string]: RegExp }>;
  [key: string]: any;
}

export interface PaginationQuery {
  totalPages?: number;
  currentPage?: number;
  limit?: number;
  next?: number;
  prev?: number;
}
