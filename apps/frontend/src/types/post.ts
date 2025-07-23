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
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}
