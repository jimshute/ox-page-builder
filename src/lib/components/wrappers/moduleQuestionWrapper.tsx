import { Component, Emit, Inject, InjectReactive, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import QuestionModule from '../../modules/questionModule';
import CbIcon from '../cbIcon';
import ModuleWrapperBase from '../moduleWrapperBase';
import PaperQuestion from '@netm/cb-question-viewer/lib/models/paperQuestion';

@Component({
  components: {
    CbIcon: CbIcon as any,
    QuestionModule
  }
})
export default class ModuleQuestionWrapper extends ModuleWrapperBase {
  @InjectReactive()
  private currentId!: number | null;

  @Inject()
  private setCurrentId!: (currentId: number) => void;

  @Inject()
  private removeCurrentId!: (currentId: number) => void;

  get questionInfo (): PaperQuestion {
    return this.layoutProperties.props;
  }

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

  private scoreChange (score: number) {
    if (typeof score === 'number') {
      this.onChange({
        ...this.layoutProperties,
        props: {
          ...this.questionInfo,
          score
        }
      })
    }
  }

  private showAnalyse () { }

  private render () {
    return <div class={['cb-paper-builder-module-question-wrapper', {
      'cb-paper-builder-module-question-wrapper-active': this.currentId === this.moduleId
    }]}
      style={this.wrapperStyle}
      onMouseover={(e: any) => this.onMouseEnter(e)}
      onMouseleave={(e: any) => this.onMouseLeave(e)}
    >
      <div class="cb-question-module-actions-wrapper drag-button">
        <a-row>
          <a-col span="12" class="left-side">
            难度：{this.questionInfo.difficultyDegree}
          </a-col>
          <a-col span="12" class="right-side">
            分数：<a-input-number
              size="small"
              value={this.questionInfo.score}
              onBlur={({ target: { value } }: any) => this.scoreChange(Number(value))}>
            </a-input-number>
            <a onClick={() => this.onMoveup()}>上移</a>
            <a onClick={() => this.onMovedown()}>下移</a>
            <a onClick={() => this.showAnalyse()}>查看解析</a>
            <a onClick={() => this.deleteModule()}>删除</a>
          </a-col>
        </a-row>
      </div>
      <this.module
        layoutProperties={this.filteredProps}
        scopedSlots={{
          ...this.$scopedSlots
        }}
      ></this.module>
    </div>
  }
}
