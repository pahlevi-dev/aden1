export interface IRegulations {
  documents: IDocument[];
}

export interface IDocument {
  name: string;
  fileUrl: string;
  description: string;
}
