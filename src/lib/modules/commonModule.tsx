import { Component } from 'vue-property-decorator';
import LayoutProperties from '../models/layoutProperties';
import BuildableModule from './buildableModule';

@Component
export default class CommonModule extends BuildableModule {
  static getInitialData (layoutProperties: any): LayoutProperties | undefined {
    if (!layoutProperties) return;
    return {
      id: Math.random(),
      type: 'commonModule',
      ...layoutProperties
    }
  }

  protected render () {
    return <div class="cb-paper-common-module">
      {this.renderComponent()}
    </div>
  }
}
