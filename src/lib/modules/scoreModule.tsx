import PaperTreeNode from '@netm/cb-question-viewer/lib/models/paperTreeNode';
import { Component, Inject, InjectReactive } from 'vue-property-decorator';
import LayoutProperties from '../models/layoutProperties';
import toChineseNumber from '../utils/to-chinese-number';
import BuildableModule from './buildableModule';

@Component
export default class CommonModule extends BuildableModule {
  static getInitialData (layoutProperties: any): LayoutProperties | undefined {
    return {
      id: Math.random(),
      type: 'scoreModule',
      style: {
        textAlign: 'center'
      },
      ...layoutProperties
    }
  }

  @InjectReactive()
  private paperTreeNodes!: PaperTreeNode[];

  protected render () {
    return <div class="cb-paper-score-module" style={this.style}>
      <span style="display: inline-block;">
        <table>
          <colgroup>
            <col style="width: 50px"></col>
            {this.paperTreeNodes.map(node => <col style="width: 50px"></col>)}
            <col style="width: 50px"></col>
          </colgroup>
          <tbody>
            <tr>
              <td>题号</td>
              {this.paperTreeNodes.map((node, index) => <td>{toChineseNumber(index + 1)}</td>)}
              <td>总分</td>
            </tr>
            <tr>
              <td>得分</td>
              {this.paperTreeNodes.map(node => <td></td>)}
              <td></td>
            </tr>
          </tbody>
        </table>
      </span>
    </div>
  }
}
