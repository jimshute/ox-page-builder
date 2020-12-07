import { Component, Emit, Inject, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import LayoutProperties from './models/layoutProperties';
import * as Modules from './modules';

@Component({
  inject: []
})
export default class ModuleRenderer extends Vue {
  @Prop({
    required: true
  })
  public layoutProperties!: LayoutProperties;

  get module () {
    return (Modules as any)[this.layoutProperties.type] || Modules.commonModule;
  }

  private buildChildren (name: string = 'default', children: LayoutProperties[]) {
    return children.map((props, index) => <ModuleRenderer {
      ...{
        props: { layoutProperties: props },
      }
    }
    ></ModuleRenderer>)
  }

  private render () {
    let scopedSlots: { [name: string]: any } = {
      default: (children: LayoutProperties[] = []) => {
        return this.buildChildren(undefined, children);
      }
    };
    if (this.layoutProperties.extras) {
      for (const name in this.layoutProperties.extras) {
        if (Object.prototype.hasOwnProperty.call(this.layoutProperties.extras, name)) {
          const children = this.layoutProperties.extras[name];
          if (children.length) {
            scopedSlots[name] = (children: LayoutProperties[]) => {
              return this.buildChildren(name, children);
            };
          }
        }
      }
    }
    return <this.module {...{
      props: {
        layoutProperties: this.layoutProperties
      },
      scopedSlots
    }}>
    </this.module>
  }
}
