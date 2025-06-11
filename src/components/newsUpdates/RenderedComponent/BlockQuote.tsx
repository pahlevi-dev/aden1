import { RawChildrenType } from '@/constants/rawTypeComponent';
import { ITextDecoration } from '@/interface/query/common/richText/raw';
import { TypoGraphy } from './TypoGraphy';

interface IProps extends ITextDecoration {
  text: string;
}

export const BlockQuote = ({ ...props }: IProps) => {
  return (
    <div className="pl-5 border-l-4 border-secondary">
      <TypoGraphy type={RawChildrenType.Paragraph} {...props} />
    </div>
  );
};
