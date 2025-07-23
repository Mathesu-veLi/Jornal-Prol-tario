export interface Post {
  documentId: number;
  cover: Media;
  title: string;
  text: string;
  description: string;
}

interface Media {
  id: number;
  url: string;
  alternativeText: string;
}
