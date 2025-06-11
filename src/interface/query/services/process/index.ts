import { IRichText } from '../../common/richText';

export interface IStepProcess {
  id: string;
  locale: string;
  name: string | null;
  description: IRichText | null;
}
