// 安装并向外暴露组件
import Switch from "./Switch.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Switch.install = (app: App) => {
  app.component(Switch.name || "WySwitch", Switch);
}

export default Switch;
export *  from "./types";

