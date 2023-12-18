export interface BaseItemQuery {
  limit?: number;
  pageNo?: number;
  cursor?: number;
}

export type ItemQuery = BaseItemQuery & {
  q?: string;
  type?: string;
  tag?: string;
  category?: string;
};
