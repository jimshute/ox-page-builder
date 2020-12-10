import { BuildableModule } from '@/lib';
import { Component, Vue } from 'vue-property-decorator';
import CustomModuleWrapper from './customModuleWrapper';

@Component
export default class CustomBuildableModule extends BuildableModule {
  static wrapper = CustomModuleWrapper;

  protected renderComponent (style: any = this.style) {
    return <div style={style}>{this.layoutProperties.text}</div>;
  }

  private render () {
    return this.renderComponent();
  }
}
