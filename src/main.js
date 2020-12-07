import Vue from 'vue';
import App from './App.vue';

import './lib/styles/index.less';
import {
  Input, Select, Form, Icon, Spin, Table, DatePicker, Tooltip, Row, Col, Checkbox, InputNumber, Button, Modal
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Input);
Vue.use(Select);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Spin);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Tooltip);
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');
