import BuildableModule from './buildableModule';
import { Component } from 'vue-property-decorator';
import LayoutProperties from '../models/layoutProperties';

@Component
export default class GutterModule extends BuildableModule {
  static getInitialData (): LayoutProperties {
    return {
      id: Math.random(),
      text: '学校：_______________  班级：_______________  姓名：_______________  学号：_______________',
      draggable: false,
      style: {
        fontSize: 14,
        textAlign: 'center',
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        transformOrigin: 'top right',
        transform: 'translateX(-100%) rotate(-90deg)',
        width: 1131.4
      },
      type: 'gutterModule'
    }
  }

  private render () {
    return <div class="cb-paper-gutter-module"
      style={this.style}>
      <div class="cb-paper-gutter-module-inner">
        {this.renderComponent({})}
        <div class="paper-gutter-tip">
          密封线内不要答题
        </div>
      </div>
    </div>
  }
}
