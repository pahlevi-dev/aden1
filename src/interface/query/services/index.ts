import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { IAggregate, IEdges } from '../common/edgesModel';
import { IThumbnail } from '../common/thumbnail';
import { IExperience } from '../experiences';
import { IAdvantage } from './advantages';
import { IStepProcess } from './process';

export interface IServiceDetail {
  name: string;
  slugService: string;
  shortDescription: string;
  description?: string;
  thumbnail: IThumbnail | null;
  icon: keyof typeof dynamicIconImports | null;
  advantage: IAdvantage[];
  stepProcess: IStepProcess[];
  keywords?: string[] | null;
  updatedAt: Date;
  experience: IExperience[];
}

export interface IService<
  T extends keyof IServiceDetail = keyof IServiceDetail
> {
  serviceDetail?: Pick<IServiceDetail, T>;
  serviceDetails?: Pick<IServiceDetail, T>[];
}

export interface IServiceCategory {
  serviceName: string;
  thumbnail: IThumbnail | null;
  description: string;
}

export interface IServiceName<
  T extends keyof IServiceCategory = keyof IServiceCategory
> {
  service?: Pick<IServiceCategory, T>;
  services?: Pick<IServiceCategory, T>[];
}

export interface IServiceDetailConnection {
  aggregate: IAggregate;
  edges: IEdges<
    IService<
      'name' | 'slugService' | 'shortDescription' | 'icon'
    >['serviceDetail']
  >[];
}
