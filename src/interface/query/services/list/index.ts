import { IServiceDetailConnection, IServiceName } from '..';

export interface IServiceListResponse {
  services: IServiceName<'serviceName'>['services'];
  serviceDetailsConnection: IServiceDetailConnection;
}
