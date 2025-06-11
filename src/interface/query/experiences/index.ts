import { IAggregate, IEdges, IPageInfo } from '../common/edgesModel';
import { ICompany } from '../company';
import { IService } from '../services';

export interface IExperience {
  year: number;
  description: string | null;
  detailLocation: string | null;
  serviceDetail: IService<'name'>['serviceDetail'];
  company: ICompany;
}

export interface IExperiencesConnections {
  aggregate: IAggregate;
  pageInfo: IPageInfo;
  edges: IEdges<IExperience>[];
}
