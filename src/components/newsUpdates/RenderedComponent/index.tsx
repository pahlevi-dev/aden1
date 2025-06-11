import { RawChildrenType } from '@/constants/rawTypeComponent';
import { IChildrenRaw } from '@/interface/query/common/richText/raw';
import { BlockQuote } from './BlockQuote';
import { ImageChild } from './ImageChild';
import { ItemList } from './ItemList';
import { TypoGraphy } from './TypoGraphy';

export const RenderedComponent = ({ type, ...props }: IChildrenRaw) => {
  switch (type) {
    case RawChildrenType.HeadingOne:
    case RawChildrenType.HeadingTwo:
    case RawChildrenType.HeadingThree:
    case RawChildrenType.HeadingFour:
    case RawChildrenType.Paragraph:
      return (
        <TypoGraphy
          type={type}
          text={props.children[0].text}
          bold={props.children[0].bold}
          italic={props.children[0].italic}
          underline={props.children[0].underline}
        />
      );

    case RawChildrenType.BlockQuote:
      return (
        <BlockQuote
          text={props.children[0].text}
          bold={props.children[0].bold}
          italic={props.children[0].italic}
          underline={props.children[0].underline}
        />
      );

    case RawChildrenType.Image:
      return <ImageChild type={type} {...props} />;

    case RawChildrenType.BulletedList:
    case RawChildrenType.NumberedList:
      return <ItemList {...props} type={type} />;
    default:
      break;
  }
};
