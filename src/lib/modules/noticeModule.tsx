import { Component } from 'vue-property-decorator';
import LayoutProperties from '../models/layoutProperties';
import BuildableModule from './buildableModule';

@Component
export default class NoticeModule extends BuildableModule {
  static getInitialData (): LayoutProperties {
    return {
      id: Math.random(),
      type: 'noticeModule',
      style: {
        textAlign: 'left',
        fontSize: 12,
        color: '#999',
        whiteSpace: 'pre-line',
        padding: '2px 4px'
      },
      text: `1．答题前填写好自己的姓名、班级、考号等信息
      2．请将答案正确填写在答题卡上`
    }
  }

  protected render () {
    let { padding, margin, ...otherStyle } = this.style;
    return <div class="cb-paper-notice-module" style={{
      padding, margin
    }}>
      <h4>注意事项</h4>
      {this.renderComponent(otherStyle)}
    </div>
  }
}
