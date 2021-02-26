import { DefaultHTMLElementProps } from '@/typings/types';

export interface GalleryUnit {
  id?: any;
  name: string;
  url: string;
  description: string;
}

export interface SlideGalleryProps extends DefaultHTMLElementProps {
  images: GalleryUnit[];
}
