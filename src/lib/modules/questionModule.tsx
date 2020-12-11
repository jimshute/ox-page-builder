import ModuleBase from './moduleBase';
import { Component, Vue } from 'vue-property-decorator';
import QuestionViewer from '@netm/cb-question-viewer';
import Question from '@netm/cb-question-viewer/lib/models/question';

Vue.use(QuestionViewer);

@Component
export default class QuestionModule extends ModuleBase {
  get questionInfo (): Question {
    return this.layoutProperties.props;
  }

  get index () {
    return this.layoutProperties.props.index;
  }

  protected renderComponent () {
    return <div>
      <question-viewer props={{ questionInfo: this.questionInfo, index: this.index }}></question-viewer>
    </div>
  }

  protected render () {
    return this.renderComponent();
  }
}
