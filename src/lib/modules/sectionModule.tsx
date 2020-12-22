import ModuleBase from './moduleBase';
import { Component, InjectReactive, Prop } from 'vue-property-decorator';
import LayoutProperties from '../models/layoutProperties';
import QuestionPaperSection from '@netm/cb-question-viewer/lib/models/questionPaperSection';
import toChineseNumber from '../utils/to-chinese-number';

@Component
export default class SectionModule extends ModuleBase {
  static getInitialData (): LayoutProperties {
    return {
      id: Math.random(),
      type: 'sectionModule'
    }
  }

  get sectionScore () {
    return this.layoutProperties.extras?.sectionScore;
  }

  get sectionInfo (): QuestionPaperSection {
    return this.layoutProperties.props;
  }

  get index () {
    return this.layoutProperties.props.index;
  }

  protected renderComponent () {
    return <div class="cb-build-paper-section">
      {this.sectionScore && this.$scopedSlots.sectionScore && this.$scopedSlots.sectionScore(this.sectionScore)}
      <h2>{toChineseNumber(this.index + 1)}、{
        <span class="section-title-name">
          {this.$scopedSlots.sectionNameEditor ?
            this.$scopedSlots.sectionNameEditor({ text: this.sectionInfo.name }) :
            this.sectionInfo.name
          }</span>
      }（共{this.layoutProperties.children?.length || 0}题）</h2>
      <div class="question-list">
        {this.$scopedSlots.default && this.$scopedSlots.default(this.children)}
      </div>
    </div>
  }

  protected render () {
    return this.renderComponent();
  }
}
