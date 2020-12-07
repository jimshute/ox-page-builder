import PaperTreeNode from '@netm/cb-question-viewer/lib/models/paperTreeNode';
import { Component, Emit, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import LayoutProperties from './models/layoutProperties';
import ModuleRenderer from './runtimeRenderer';
import './styles/index.less';

@Component({
  components: { ModuleRenderer },
  inject: []
})
export default class PaperBuilder extends Vue {
  @ProvideReactive()
  @Prop()
  private paperTreeNodes!: PaperTreeNode[];

  @Prop({
    default: () => []
  })
  private paperLayout!: LayoutProperties;

  private render () {
    return <div class="cb-paper-runtime-comp">
      <module-renderer layoutProperties={this.paperLayout} />
    </div>
  }
}
