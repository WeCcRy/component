// 安装并向外暴露组件
import Select from "./Select.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Select.install = (app: App) => {
  app.component(Select.name || "WySelect", Select);
}

export default Select;
export *  from "./types";

