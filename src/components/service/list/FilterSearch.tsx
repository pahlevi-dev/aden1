import { Button } from '@/components/ui/button';
import { ComboBox } from '@/components/ui/combobox';
import { IOptions } from '@/interface/config/option';
import { useTranslations } from 'next-intl';
import Form from 'next/form';

interface IProps {
  options: IOptions<string>[];
  defaultValue: string;
}

export const FilterSearch = ({ options, defaultValue }: IProps) => {
  const t = useTranslations('CTA');

  return (
    <Form action="" className="flex mt-2 gap-2 items-center">
      <ComboBox name="search" option={options} defaultValue={defaultValue} />
      <Button type="submit" className="rounded-md">
        {t('search')}
      </Button>
    </Form>
  );
};
