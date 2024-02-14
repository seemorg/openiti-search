import type { AuthorDocument } from "./author";

export type BookDocument = {
  id: string;
  authorId: string;
  primaryArabicName: string;
  otherArabicNames: string[];
  primaryLatinName: string;
  otherLatinNames: string[];
  _nameVariations: string[];
  author: AuthorDocument;
  versionIds: string[];
  genreTags: string[];
};
