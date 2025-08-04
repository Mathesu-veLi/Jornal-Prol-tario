export interface Post {
  documentId: string;
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
