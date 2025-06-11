import { Button } from '@/components/ui/button';
import { BaseCard } from '@/components/ui/card';
import { Icon } from '@/components/ui/icons';
import { IServiceDetail } from '@/interface/query/services';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Link from 'next/link';

interface IProps
  extends Pick<
    IServiceDetail,
    'name' | 'slugService' | 'shortDescription' | 'icon'
  > {
  btnText?: string;
  variant?: 'light' | 'dark';
}

export const CardServices = ({
  name,
  icon,
  shortDescription,
  slugService,
  btnText,
  variant = 'light',
}: IProps) => {
  const iconName: keyof typeof dynamicIconImports =
    icon !== null ? icon : 'sprout';

  const baseCardStyle =
    variant === 'light'
      ? 'bg-[#ECECEC] boder-secondary'
      : 'bg-[#262626] border-[#6B6B6B]';

  const iconStyle = variant === 'light' ? 'bg-secondary' : 'bg-background';

  return (
    <BaseCard className={`p-5 border ${baseCardStyle} flex flex-col`}>
      <div
        className={`${iconStyle} w-12 aspect-square flex items-center justify-center rounded-md`}
      >
        <Icon name={iconName} color="#191919" size={18} strokeWidth={1} />
      </div>
      <div className="mt-5 mb-3">
        <h3 className="texl-3xl font-semibold mb-3">{name}</h3>
        <p>{shortDescription}</p>
      </div>
      {btnText ? (
        <div className="mt-auto">
          <Button variant="outline" asChild>
            <Link href={`services/${slugService}`} className="self-stretch">
              {btnText}
            </Link>
          </Button>
        </div>
      ) : null}
    </BaseCard>
  );
};
