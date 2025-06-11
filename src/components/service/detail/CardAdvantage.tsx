import BasicImage from '@/app/assets/image/pexels-lisa-baker-336803-944407.jpg';
import { BaseCard } from '@/components/ui/card';
import { Chips } from '@/components/ui/chips';
import { Icon } from '@/components/ui/icons';
import { IAdvantage } from '@/interface/query/services/advantages';
import Image from 'next/image';

interface IProps extends IAdvantage {
  index: number;
  chipsText: string;
}

export const CardAdvantages = ({
  thumbnail,
  name,
  description,
  index,
  chipsText,
}: IProps) => {
  const colors = [
    'bg-[#E8E24E] border-primary',
    'bg-[#ECECEC] border-primary',
    'bg-[#191919] text-white border-background',
  ];

  const number = index + 1;
  return (
    <BaseCard
      className={`border transition-all overflow-hidden group relative h-[60vh] md:h-[45vh] border-[#D9D9D9] ${colors[index]}`}
    >
      <Image
        src={thumbnail?.url ?? BasicImage}
        alt={name}
        width={500}
        height={248}
        className="object-cover transition-all group-hover:block group-hover:h-1/2 lg:group-hover:h-[65%] h-0 rounded-md"
      />
      <Chips
        className={`absolute top-5 left-5 group-hover:opacity-0 border ${colors[index]} bg-transparent`}
      >
        <div>{chipsText}</div>
      </Chips>

      <Chips className="absolute top-5 left-5 py-3 font-semibold text-primary opacity-0 group-hover:opacity-100 bg-background">
        <div>{number}</div>
      </Chips>

      <div className="text-[10rem] transition-all text-center group-hover:h-0 group-hover:opacity-0 h-[82%] flex items-center justify-center">
        <div>{number}</div>
      </div>
      <div className="relative flex items-center justify-between">
        <div className="p-5">
          <p className="text-sm group-hover:text-xl group-hover:font-semibold">
            {name}
          </p>
          <div className="transition-all h-0 overflow-hidden group-hover:h-auto">
            {description}
          </div>
        </div>

        <div className="absolute bottom-1/2 transition-all right-5 group-hover:right-[-100%] group-hover:opacity-0 translate-y-1/2">
          <Icon name="circle-arrow-right" size={35} strokeWidth={1} />
        </div>
      </div>
    </BaseCard>
  );
};
