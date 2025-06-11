import { IOptions } from '@/interface/config/option';

export const generateYearOptions = (range: number): IOptions<number>[] => {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear - range;

  const years = [];
  for (let year = currentYear; year >= endYear; year--) {
    years.push({ value: year, label: year.toString() });
  }
  return years;
};
