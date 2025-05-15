// 安装并向外暴露组件
import Button from "./Button.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Button.install = (app: App) => {
  app.component(Button.name || "WyButton", Button);
}

export default Button;
export *  from "./types";

