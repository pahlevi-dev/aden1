export type IParams<T = unknown> = {
  locale: string;
} & T;

export type IQuery<T = unknown> = {
  search: string;
  page?: number;
} & T;
