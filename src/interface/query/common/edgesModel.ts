export interface IAggregate {
  count: number;
}

export interface IEdges<T> {
  node: T;
}

export interface IPageInfo {
  pageSize: number;
}
