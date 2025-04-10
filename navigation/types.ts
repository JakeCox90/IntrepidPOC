import type { Article } from '../services/sunNewsService';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  SearchArticle: { article: Article };
  ForYou: undefined;
  AllNews: undefined;
  Saved: undefined;
};
