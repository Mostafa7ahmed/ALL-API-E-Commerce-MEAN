export interface CustomErrors extends Error {
  statusCode?: number;
  status?: string;
}
