import { RawChildrenType } from '@/constants/rawTypeComponent';
import { IChildrenRaw } from '@/interface/query/common/richText/raw';
import { TypoGraphy } from './TypoGraphy';

export const ItemList = ({ type, children }: IChildrenRaw) => {
  const listType =
    type === RawChildrenType.NumberedList ? 'list-decimal' : 'list-disc';
  return (
    <div className="pl-5">
      <ol className={listType}>
        {children[0].children?.map((item, i) => (
          <li key={i}>
            {item.children?.map((el, idx) => (
              <TypoGraphy
                key={idx}
                type={RawChildrenType.Paragraph}
                text={el.text}
                underline={el.underline}
                bold={el.bold}
                italic={el.italic}
              />
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
};
