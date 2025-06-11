import { RawChildrenType } from '@/constants/rawTypeComponent';
import { ITextDecoration } from '@/interface/query/common/richText/raw';

interface IProps extends ITextDecoration {
  type: RawChildrenType;
  text: string;
}

export const TypoGraphy = ({
  text,
  type = RawChildrenType.Paragraph,
  bold,
  italic,
  underline,
}: IProps) => {
  const baseClassName = `mb-3 ${bold ? 'font-semibold' : 'font-medium'} ${
    italic ? 'italic' : ''
  } ${underline ? 'underline' : ''}`;

  switch (type) {
    case RawChildrenType.HeadingOne:
      return <h1 className={baseClassName}>{text}</h1>;

    case RawChildrenType.HeadingTwo:
      return <h2 className={baseClassName}>{text}</h2>;

    case RawChildrenType.HeadingThree:
      return <h3 className={baseClassName}>{text}</h3>;

    case RawChildrenType.HeadingFour:
      return <h4 className={baseClassName}>{text}</h4>;

    case RawChildrenType.Paragraph:
    default:
      return <p className={baseClassName}>{text}</p>;
  }
};
