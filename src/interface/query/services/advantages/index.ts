import { IThumbnail } from '../../common/thumbnail';

export interface IAdvantage {
  name: string;
  description: string | null;
  thumbnail: IThumbnail | null;
}
