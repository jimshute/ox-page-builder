import LayoutProperties from '../models/layoutProperties';
import { Prop, Vue } from 'vue-property-decorator';

export default abstract class ModuleBase extends Vue {
  @Prop()
  protected layoutProperties!: LayoutProperties;

  get children () {
    return this.layoutProperties.children;
  }

  protected abstract renderComponent (): any;
}
