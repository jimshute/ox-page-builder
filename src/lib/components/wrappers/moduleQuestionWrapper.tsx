import { Component, Emit, Inject, InjectReactive, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import QuestionModule from '../../modules/questionModule';
import CbIcon from '../cbIcon';
import ModuleWrapperBase from '../moduleWrapperBase';
import QuestionViewer from '@netm/cb-question-viewer';
import PaperQuestion from '@netm/cb-question-viewer/lib/models/paperQuestion';
import VueHtmlRender from '@netm/vue-html-render';
import QuestionTypeEnum from '@netm/cb-question-viewer/lib/models/questionTypeEnum';

Vue.use(QuestionViewer);

@Component({
  components: {
    CbIcon: CbIcon as any,
    QuestionModule,
    VueHtmlRender
  }
})
export default class ModuleQuestionWrapper extends ModuleWrapperBase {
  private analyzeVisible: boolean = false;

  @InjectReactive()
  private currentId!: number | null;

  @Inject()
  private setCurrentId!: (currentId: number) => void;

  @Inject()
  private removeCurrentId!: (currentId: number) => void;

  get questionInfo (): PaperQuestion {
    return this.layoutProperties.props;
  }

  get hasAnalyze () {
    if (this.questionInfo.type === QuestionTypeEnum.COMBINATION) {
      return this.questionInfo.subQuestionDTOS?.some(item => item.content.analyse);
    } else {
      return !!this.questionInfo.content?.analyse;
    }
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

  private onSubQuestionScoreChange (index: number, score: number) {
    if (typeof score === 'number') {
      this.onChange({
        ...this.layoutProperties,
        props: {
          ...this.questionInfo,
          subQuestionDTOS: this.questionInfo.subQuestionDTOS ?
            this.questionInfo.subQuestionDTOS.map((question, idx) => {
              if (index === idx) {
                return {
                  ...question,
                  score
                }
              } else {
                return question;
              }
            }) : this.questionInfo.subQuestionDTOS
        }
      })
    }
  }

  private showAnalyse () {
    this.analyzeVisible = true;
  }

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
            难度：{(this.questionInfo.difficultyDegree / 100).toFixed(2)}
          </a-col>
          <a-col span="12" class="right-side">
            分数：<span style="margin-right: 4px;">
              {this.questionInfo.type !== QuestionTypeEnum.COMBINATION && <span>{
                this.readonly ? `${this.questionInfo.score}分` : <a-input-number
                  size="small"
                  value={this.questionInfo.score}
                  min={0}
                  onBlur={({ target: { value } }: any) => this.scoreChange(Number(value))}>
                </a-input-number>}
              </span>}
            </span>
            {this.questionInfo.type === QuestionTypeEnum.COMBINATION && <span>
              <a-popover
                getPopupContainer={() => this.$el}
                trigger="click"
                placement="bottomLeft"
                scopedSlots={{
                  content: () => <div>
                    {(this.questionInfo.subQuestionDTOS || []).map((question, index) => {
                      return <div style="margin: 4px 4px;">
                        {index + 1}.&nbsp;&nbsp;
                        {this.readonly ?
                          `${question.score}分` :
                          <a-input-number
                            min={0}
                            value={question.score}
                            onChange={(score: number) => this.onSubQuestionScoreChange(index, score)}
                          />}
                      </div>
                    })}
                  </div>
                }}>
                <span>查看子题分数</span>
              </a-popover>
            </span>}
            {!this.readonly && <a onClick={() => this.onMoveup()}>上移</a>}
            {!this.readonly && <a onClick={() => this.onMovedown()}>下移</a>}
            {this.hasAnalyze && <a onClick={() => this.showAnalyse()}>查看解析</a>}
            {!this.readonly && <a onClick={() => this.deleteModule()}>删除</a>}
          </a-col>
        </a-row>
        <a-modal
          visible={this.analyzeVisible}
          title="题目解析"
          footer={null}
          onCancel={() => this.analyzeVisible = false}
        >
          <question-viewer showAnalysis questionInfo={this.questionInfo} />
        </a-modal>
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
