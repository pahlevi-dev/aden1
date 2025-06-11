import { IRaw } from './raw';

export interface IRichText {
  html: string;
  markdown: string;
  text: string;
  raw: IRaw;
}
