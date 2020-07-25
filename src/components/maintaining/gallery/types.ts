import { AxisPointString, DefaultHTMLElementProps } from '../../typings/types';

export type FixedUnit = GalleryUnit & AxisPointString;
export type GalleryMode = 'random' | 'annular';

export interface GalleryUnit {
  name: string;
  url: string;
  description: string;
}

export interface GalleryProps extends DefaultHTMLElementProps {
  units: GalleryUnit[];
  limit?: number;
  mode?: GalleryMode;
  defaultGray?: number;
  centralized?: boolean;
  onClick?: (unit: GalleryUnit) => any;
}
