export default interface LayoutProperties {
  id?: any;
  type: string;
  // unique?: boolean;
  text?: string;
  props?: any;
  draggable?: boolean;
  childrenSortable?: boolean;
  style?: {
    [styleName: string]: number | string
  },
  children?: LayoutProperties[];
  extras?: {
    [name: string]: LayoutProperties[]
  }
}
