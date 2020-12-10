import ModuleBase from './moduleBase';

export default class BuildableModule extends ModuleBase {
  get style () {
    if (!this.layoutProperties.style) return {};
    let computedStyle: any = {};
    let style = this.layoutProperties.style
    for (const key in style) {
      if (Object.prototype.hasOwnProperty.call(style, key)) {
        const value = (style as any)[key];
        computedStyle[key] = this.toPixcel(value);
      }
    }
    return computedStyle;
  }

  get location () {
    return {
      top: this.style.top,
      left: this.style.left,
      right: this.style.right,
      bottom: this.style.bottom,
    };
  }

  toPixcel (val?: number | string) {
    if (val === undefined) return;
    if (typeof val === 'number') {
      val = val + 'px';
    }
    return val;
  }

  protected renderComponent (style: any = this.style) {
    if (this.$scopedSlots.textEditor) {
      return this.$scopedSlots.textEditor({ text: this.layoutProperties.text, style })
    } else {
      return <div style={style}>{this.layoutProperties.text}</div>;
    }
  }
}
