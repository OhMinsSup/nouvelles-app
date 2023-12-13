export interface BaseItemQuery {
  limit?: number;
  pageNo?: number;
  cursor?: string;
}

export type ItemQuery = BaseItemQuery & {
  q?: string;
  type?: string;
  tag?: string;
  category?: string;
};
