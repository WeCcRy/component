// 安装并向外暴露组件
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem/CollapseItem.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Collapse.install = (app: App) => {
  app.component(Collapse.name || "WyCollapse", Collapse);
}

CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name || "WyCollapseItem", CollapseItem);  
}

export default Collapse;
export { CollapseItem };
export *  from "./types";

