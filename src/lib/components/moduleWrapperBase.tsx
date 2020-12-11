import { Component, Emit, InjectReactive, Prop, PropSync, Vue } from 'vue-property-decorator';
import LayoutProperties from '../models/layoutProperties';
import { commonModule } from '../modules';

export default class ModuleWrapperBase extends Vue {
  @Prop()
  protected layoutProperties!: LayoutProperties;

  @Prop({
    default: () => commonModule
  })
  protected module: any;

  @InjectReactive()
  protected readonly!: boolean;

  get filteredProps () {
    let { style, ...others } = this.layoutProperties;
    let {
      position,
      top,
      left,
      right,
      bottom,
      transform,
      transformOrigin,
      width,
      height,
      ...otherStyle } = (style || {});
    let filteredProps = { ...others, style: otherStyle };
    return filteredProps
  }

  get moduleId () {
    return this.layoutProperties.id;
  }

  get wrapperStyle () {
    let { style } = this.layoutProperties;
    let { position, top, left, right, bottom, transform, transformOrigin, width, height } = (style || {});
    return {
      position,
      top: this.filterPixels(top),
      left: this.filterPixels(left),
      right: this.filterPixels(right),
      bottom: this.filterPixels(bottom),
      width: this.filterPixels(width),
      height: this.filterPixels(height),
      transform,
      transformOrigin
    };
  }

  get draggable () {
    return this.layoutProperties.draggable === undefined || this.layoutProperties.draggable === true;
  }

  protected filterPixels (num?: string | number) {
    if (num === undefined) return;
    if (typeof num === 'number') return num + 'px';
    return num;
  }

  @Emit('change')
  protected onChange (arg: LayoutProperties) {
    let { style } = this.layoutProperties;
    let { position, top, left, right, bottom, transform, transformOrigin, width, height } = style || {};
    arg.style = {
      position, top, left, right, bottom, transform, transformOrigin, width, height,
      ...arg.style
    };
    return arg;
  }

  @Emit('delete')
  protected deleteModule () {
    return this.layoutProperties;
  }

  @Emit('moveup')
  protected onMoveup () { }

  @Emit('movedown')
  protected onMovedown () { }
}
