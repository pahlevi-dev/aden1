import { Button } from '@/components/ui/button';
import { ComboBox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icons';
import { IOptions } from '@/interface/config/option';
import { IService } from '@/interface/query/services';
import { generateYearOptions } from '@/lib/config/generateYearOptions';
import { useTranslations } from 'next-intl';
import Form from 'next/form';

interface IProps {
  latestYear: number;
  selectedService: string;
  selectedYear: number;
  services: IService<'name' | 'slugService'>['serviceDetails'];
}

export const FilterExperience = ({
  latestYear,
  services,
  selectedYear = new Date().getFullYear(),
  selectedService = 'amdal',
}: IProps) => {
  const t = useTranslations('CTA');
  const currentYear = new Date().getFullYear();
  const yearOptions = generateYearOptions(currentYear - latestYear);

  const servicesOptions =
    services?.map(
      (item): IOptions<string> => ({
        label: item.name,
        value: item.slugService,
      })
    ) ?? [];

  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger className="w-full" asChild>
        <Button
          className="mt-2 rounded-md w-full flex justify-between"
          variant="outline"
        >
          <span>Filter</span> <Icon name="sliders-horizontal" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <Form
          action="about"
          className="grid md:grid-cols-2 gap-3 mt-2"
          replace
          scroll={false}
        >
          <ComboBox
            placeholder="Service"
            option={servicesOptions}
            name="service"
            className="z-10"
            defaultValue={selectedService}
          />
          <ComboBox
            placeholder="Year"
            option={yearOptions}
            name="year"
            className="z-10"
            defaultValue={selectedYear}
          />
          <div className="flex justify-end md:col-span-2 z-0 gap-3">
            <Button type="reset" variant="outline" className="rounded-md">
              {t('reset')}
            </Button>
            <DialogTrigger asChild>
              <Button type="submit" className="rounded-md">
                {t('save')}
              </Button>
            </DialogTrigger>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
