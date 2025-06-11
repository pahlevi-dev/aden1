export interface IPublished {
  publishedBy: IPublishedBy;
  publishedAt: Date | string;
}

export interface IPublishedBy {
  name: string;
}
