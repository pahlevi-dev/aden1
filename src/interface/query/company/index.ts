import { CompanyType } from '@/constants/companyType';
import { IThumbnail } from '../common/thumbnail';

export interface ICompany {
  companyName: string;
  companySite: string | null;
  description: string | null;
  logo: IThumbnail;
  type: CompanyType;
}
