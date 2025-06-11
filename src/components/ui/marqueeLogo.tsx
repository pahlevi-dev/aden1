import { ICompany } from '@/interface/query/company';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

interface IProps {
  data: Pick<ICompany, 'companyName' | 'logo' | 'companySite' | 'type'>[];
}

export const MarqueeLogo = ({ data }: IProps) => {
  if (data.length)
    return (
      <Marquee
        pauseOnHover
        className="w-full bg-white py-5 mix-blend-multiply"
        speed={100}
        autoFill
      >
        {data.map((item, i) => {
          if (item.companySite) {
            return (
              <Link
                href={item.companySite}
                target="_blank"
                className="mx-2"
                key={i}
              >
                <Image
                  width={100}
                  height={100}
                  src={item.logo.url!}
                  className="grayscale mix-blend-multiply hover:grayscale-0 transition-all w-24 aspect-square object-contain"
                  alt={item.companyName}
                />
              </Link>
            );
          }

          return (
            <div key={i} className="mx-2">
              <Image
                width={100}
                height={100}
                src={item.logo.url!}
                className="grayscale mix-blend-multiply hover:grayscale-0 transition-all w-24 aspect-square object-contain"
                alt={item.companyName}
              />
            </div>
          );
        })}
      </Marquee>
    );
};
