import { IDocument } from '@/interface/query/regulations';
import { CardRegulation } from './CardRegulation';

interface IProps {
  data: IDocument[];
}
export const ContainerList = ({ data }: IProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-stretch">
      {data.map((item, i) => (
        <CardRegulation key={i} {...item} />
      ))}
    </div>
  );
};
