import { DefaultHTMLElementProps } from '@/typings/types';

export interface GalleryUnit {
  id?: any;
  name: string;
  url: string;
  description: string;
}

export interface Gallery2Props extends DefaultHTMLElementProps {
  images: GalleryUnit[];
}
