export type BaseItemQuery = {
  limit?: number | string;
  pageNo?: number | string;
  cursor?: string;
};

export type ItemQuery = BaseItemQuery & {
  q?: string;
  type?: string;
  tag?: string;
  category?: string;
};
