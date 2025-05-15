// 安装并向外暴露组件
import Form from "./Form.vue";
import FormItem from "./FormItem/FormItem.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Form.install = (app: App) => {
  app.component(Form.name || "WyForm", Form);
}

FormItem.install = (app: App) => {
  app.component(FormItem.name || "WyFormItem", FormItem);  
}

export default Form;
export { FormItem };
export *  from "./types";

