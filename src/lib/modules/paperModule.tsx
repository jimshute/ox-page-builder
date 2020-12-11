import { Component, InjectReactive, Prop } from 'vue-property-decorator';
import LayoutProperties from '../models/layoutProperties';
import BuildableModule from './buildableModule';

@Component
export default class PaperModule extends BuildableModule {
  static getInitialData (layoutProperties?: any): LayoutProperties {
    return {
      id: Math.random(),
      type: 'paperModule',
      text: '试卷',
      style: {
        position: 'relative',
        fontSize: 24
      },
      unique: true,
      ...layoutProperties
    }
  }

  protected render () {
    return <div
      class="cb-paper-module"
      style={{
        position: this.style.position,
        ...this.location
      }}>
      <h1 class="cb-paper-title">
        {this.renderComponent()}
      </h1>
      {this.$scopedSlots.paperExtra && this.$scopedSlots.paperExtra(this.layoutProperties.extras?.paperExtra)}
      {this.$scopedSlots.default && this.$scopedSlots.default(this.children)}
    </div>
  }
}
