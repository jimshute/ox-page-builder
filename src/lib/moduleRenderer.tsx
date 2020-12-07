import { Component, Emit, Inject, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import * as Wrappers from './components/wrappers';
import LayoutProperties from './models/layoutProperties';
import Vuedraggable from 'vuedraggable';

@Component({
  components: { Vuedraggable },
  inject: []
})
export default class ModuleRenderer extends Vue {
  @Prop({
    required: true
  })
  public layoutProperties!: LayoutProperties;

  get wrapper (): any {
    switch (this.layoutProperties.type) {
      case 'questionModule':
        return Wrappers.moduleQuestionWrapper;
      case 'sectionModule':
        return Wrappers.moduleSectionWrapper;
      default:
        return Wrappers.moduleCommonWrapper;
    }
  }

  @Emit('propertiesChange')
  private onChange (properites: LayoutProperties) {
    return properites;
  }

  @Emit('delete')
  private deleteModule (props: LayoutProperties) {
    return props;
  }

  private childMoveTo (slotName: string, currentIndex: number, distIndex: number) {
    let children = this.layoutProperties.children;
    if (slotName !== 'default') {
      if (this.layoutProperties.extras) {
        children = this.layoutProperties.extras[slotName];
      } else {
        children = [];
      }
    }
    if (!children || !children.length) return;
    let childTobeMoved = children[currentIndex];
    if (!childTobeMoved) return;
    if (distIndex < 0 || distIndex >= children.length) {
      return;
    }
    let newChildren = [...children];
    newChildren.splice(currentIndex, 1);
    newChildren.splice(distIndex, 0, childTobeMoved);
    this.draggableChange(slotName, newChildren);
  }

  private draggableChange (name: string, children: LayoutProperties[]) {
    let newProp: LayoutProperties = { ...this.layoutProperties };
    if (name === 'default') {
      newProp.children = children;
    } else {
      if (!newProp.extras) {
        newProp.extras = {};
      }
      newProp.extras[name] = children;
    }
    this.onChange(newProp);
  }

  private buildChildren (name: string = 'default', children: LayoutProperties[]) {
    return <vuedraggable
      value={children}
      animation={200}
      handle=".drag-button"
      onInput={(children: any) => this.draggableChange(name, children)}>{
        children.map((props, index) => <ModuleRenderer {
          ...{
            props: { layoutProperties: props },
            on: {
              propertiesChange: (properites: LayoutProperties) => {
                this.onChange(properites)
              },
              moveup: () => this.childMoveTo(name, index, index - 1),
              movedown: () => this.childMoveTo(name, index, index + 1),
              delete: (props: LayoutProperties) => {
                this.deleteModule(props)
              }
            }
          }
        }
        ></ModuleRenderer>)}
    </vuedraggable>
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
    return <this.wrapper {...{
      props: {
        layoutProperties: this.layoutProperties
      },
      on: {
        change: (properites: LayoutProperties) => this.onChange(properites),
        moveup: () => this.$emit('moveup'),
        movedown: () => this.$emit('movedown'),
        delete: (props: LayoutProperties) => {
          this.deleteModule(props)
        }
      },
      scopedSlots
    }}>
    </this.wrapper>
  }
}
