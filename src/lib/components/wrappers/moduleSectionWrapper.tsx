import { Component, Emit, Inject, InjectReactive, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import SectionModule from '../../modules/sectionModule';
import ModuleWrapperBase from '../moduleWrapperBase';
import CbIcon from '../cbIcon';

@Component({
  components: {
    CbIcon: CbIcon as any,
    SectionModule
  }
})
export default class ModuleSectionWrapper extends ModuleWrapperBase {
  @InjectReactive()
  private currentId!: number | null;

  @Inject()
  private setCurrentId!: (currentId: number) => void;

  @Inject()
  private removeCurrentId!: (currentId: number) => void;

  private onMouseEnter (e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.setCurrentId(this.moduleId)
  }

  private onMouseLeave (e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.removeCurrentId(this.moduleId);
  }

  private onSectionNameChange (e: any) {
    let target = e.target as HTMLDivElement;
    if (target.innerText !== this.layoutProperties.text) {
      this.onChange({
        ...this.layoutProperties,
        props: {
          ...this.layoutProperties.props,
          name: target.innerText
        }
      });
    }
  }

  private render () {
    return <div class={['cb-paper-builder-module-section-wrapper', {
      'cb-paper-builder-module-section-wrapper-active': this.currentId === this.moduleId
    }]}
      style={this.wrapperStyle}
    // onMouseover={(e: any) => this.onMouseEnter(e)}
    // onMouseleave={(e: any) => this.onMouseLeave(e)}
    >
      <div class="cb-paper-builder-module-actions-wrapper">
        <div class="cb-paper-builder-module-actions-inner">
          <a onClick={() => this.deleteModule()}><cb-icon type="cb-trash" /></a>
        </div>
      </div>
      <section-module
        layoutProperties={this.filteredProps}
        scopedSlots={{
          sectionNameEditor: ({ text }: any) => <div
            contenteditable={true}
            onBlur={(e: any) => this.onSectionNameChange(e)}
          >{text}</div>,
          ...this.$scopedSlots
        }}
      ></section-module>
      {/* {this.$slots.default} */}
    </div >
  }
}
