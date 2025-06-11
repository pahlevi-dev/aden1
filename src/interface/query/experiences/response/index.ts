import { IExperience, IExperiencesConnections } from '..';
import { IService } from '../../services';

export interface IExperienceAboutResponse {
  experiencesConnection: IExperiencesConnections;
  serviceDetails: IService<'name' | 'slugService'>['serviceDetails'];
  experiences: Pick<IExperience, 'year'>[];
}
