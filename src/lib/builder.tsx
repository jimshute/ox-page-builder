import PaperTreeNode from '@netm/cb-question-viewer/lib/models/paperTreeNode';
import { Component, Emit, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
import LayoutProperties from './models/layoutProperties';
import ModuleRenderer from './moduleRenderer';

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

  @ProvideReactive()
  private currentId: number | null = null;

  @ProvideReactive()
  @Prop()
  private modules!: { [moduleName: string]: any }

  @Provide()
  private setCurrentId (currentId: number) {
    this.currentId = currentId;
  }

  @Provide()
  private removeCurrentId (currentId: number) {
    if (this.currentId === currentId) {
      this.currentId = null;
    }
  }

  @Emit('propertiesChange')
  private onPropertiesChange (properties: LayoutProperties) {
    return properties;
  }

  @Emit('delete')
  private onDeleteModule (props: LayoutProperties) {
    return props;
  }

  private render () {
    return <div class="cb-paper-builder-comp">
      <module-renderer
        onPropertiesChange={(properties: LayoutProperties) => this.onPropertiesChange(properties)}
        onDelete={(props: LayoutProperties) => this.onDeleteModule(props)}
        layoutProperties={this.paperLayout} />
    </div>
  }
}
