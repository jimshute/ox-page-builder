import { ModuleWrapperBase } from '@/lib';
import { Component, Inject, InjectReactive } from 'vue-property-decorator';

@Component
export default class CustomModuleWrapper extends ModuleWrapperBase {
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

  private onBlur (e: FocusEvent) {
    let target = e.target as HTMLDivElement;
    if (target.innerText !== this.filteredProps.text) {
      this.onChange({
        ...this.filteredProps,
        text: target.innerText
      });
    }
  }

  private render () {
    return <div class={['cb-paper-builder-module-wrapper', {
      'cb-paper-builder-module-wrapper-active': this.currentId === this.moduleId
    }]}
      onMouseover={(e: any) => this.onMouseEnter(e)}
      onMouseleave={(e: any) => this.onMouseLeave(e)}
    >
      <div class="cb-paper-builder-module-wrapper-inner" style={this.wrapperStyle}>
        <div class="cb-paper-builder-module-actions-wrapper">
          <div class="cb-paper-builder-module-actions-inner">
            Hello mother fucker!
            {this.draggable && <a class="drag-button"><a-icon type="drag" /></a>}
            <a onClick={() => this.deleteModule()}><cb-icon type="cb-trash" /></a>
          </div>
        </div>
        <this.module {...{
          props: {
            layoutProperties: this.filteredProps
          },
          scopedSlots: {
            textEditor: ({ text, style }: any) => {
              return <div
                key={text}
                style={style}
                contenteditable={true}
                onBlur={(e: any) => this.onBlur(e)}
              >{text}</div>
            },
            ...this.$scopedSlots
          }
        }} />
      </div>
    </div>
  }
}
