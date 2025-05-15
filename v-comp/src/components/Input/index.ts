// 安装并向外暴露组件
import Input from "./Input.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Input.install = (app: App) => {
  app.component(Input.name || "WyInput", Input);
}

export default Input;
export *  from "./types";

