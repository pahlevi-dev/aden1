import { RawChildrenType } from '@/constants/rawTypeComponent';

export interface IRaw {
  children: IChildrenRaw[];
}

export interface IChildrenRaw {
  type: RawChildrenType;
  children: IInnerChildrenRaw[];
  src?: string;
  title?: string;
  width?: number;
  handle?: string;
  height?: number;
  mimeType?: string;
}

export interface IInnerChildrenRaw extends ITextDecoration {
  text: string;
  children?: IInnerChildrenRaw[];
}

export interface ITextDecoration {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}
