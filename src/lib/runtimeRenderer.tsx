import { Component, Emit, Inject, InjectReactive, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import LayoutProperties from './models/layoutProperties';
import * as Modules from './modules';

@Component({
})
export default class RuntimeRenderer extends Vue {
  @Prop({
    required: true
  })
  public layoutProperties!: LayoutProperties;

  @InjectReactive()
  private modules!: { [moduleName: string]: any }

  get innerModules (): { [moduleName: string]: any } {
    return {
      ...Modules,
      ...this.modules,
    }
  }

  get module () {
    return this.innerModules[this.layoutProperties.type] || Modules.commonModule;
  }

  private buildChildren (name: string = 'default', children: LayoutProperties[]) {
    return children.map((props, index) => <runtime-renderer {
      ...{
        props: { layoutProperties: props },
      }
    }
    ></runtime-renderer>)
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

if (!Vue.component('runtime-renderer')) {
  Vue.component('runtime-renderer', RuntimeRenderer)
}
