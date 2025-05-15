// 安装并向外暴露组件
import Dropdown from "./Dropdown.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Dropdown.install = (app: App) => {
  app.component(Dropdown.name || "WyDropdown", Dropdown);
}

export default Dropdown;
export *  from "./types";

