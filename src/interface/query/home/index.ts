import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ICompany } from '../company';
import { IService, IServiceName } from '../services';

export interface IHomeResponse {
  serviceDetails: IService<
    'name' | 'experience' | 'description' | 'thumbnail' | 'icon' | 'slugService'
  >['serviceDetails'];
  services: IServiceName<'serviceName' | 'description'>['services'];
  companies: Pick<ICompany, 'companyName' | 'logo' | 'companySite' | 'type'>[];
}

export interface IExperienceShort {
  name: string;
  description: string | null;
  image: string | StaticImport;
  clients?: number;
  isShowBtn: boolean;
  slug?: string;
  icon?: keyof typeof dynamicIconImports | null;
}
