// 安装并向外暴露组件
import Tooltip from "./Tooltip.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Tooltip.install = (app: App) => {
  app.component(Tooltip.name || "WyTooltip", Tooltip);
}

export default Tooltip;
export *  from "./types";

