// 安装并向外暴露组件
import Icon from "./Icon.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Icon.install = (app: App) => {
  app.component(Icon.name || "WyIcon", Icon);
}

export default Icon;
export *  from "./types";

