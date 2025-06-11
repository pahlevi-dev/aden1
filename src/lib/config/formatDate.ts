import { IFormatDate } from '@/interface/config/formatDate';
import moment from 'moment';

export const formatDate = (isoDate?: Date | string): IFormatDate => {
  if (!isoDate)
    return {
      month: '',
      day: '',
      year: '',
    };

  const date = moment(isoDate);
  return {
    month: date.format('MMMM'),
    day: date.format('DD'),
    year: date.format('YYYY'),
  };
};
