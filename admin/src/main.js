// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'

// import 'element-ui/lib/theme-default/index.css'

// Vue.use(ElementUI)

/*
import {
  Button,
  Select,
  Dialog,
  Dropdown,
  Checkbox,
  Table,
  TableColumn,
  Row,
  Col,
  Form,
  FormItem,
  Alert,
  Icon,
  Menu,
  MenuItem,
  Upload,
  Input,
  MessageBox,
  Message
} from 'element-ui'
*/

// import 'element-ui/lib/theme-default/index.css'
/*
const components = [
  Button,
  Select,
  Dialog,
  Dropdown,
  Checkbox,
  Table,
  TableColumn,
  Row,
  Col,
  Form,
  FormItem,
  Alert,
  Icon,
  Menu,
  MenuItem,
  Upload,
  Input,
  MessageBox,
  Message]

components.forEach(item => {
  Vue.component(item.name, item);
})
const MsgBox = MessageBox;
Vue.prototype.$msgbox = MsgBox;
Vue.prototype.$alert = MsgBox.alert;
Vue.prototype.$confirm = MsgBox.confirm;
Vue.prototype.$prompt = MsgBox.prompt;

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;*/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
