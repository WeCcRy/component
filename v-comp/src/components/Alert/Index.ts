// 安装并向外暴露组件
import Alert from "./Alert.vue";
import type { App } from "vue";

// 使用app.use()时，对调用对象上的install方法
Alert.install = (app: App) => {
  app.component(Alert.name || "WyAlert", Alert);
}

export default Alert;
export *  from "./types";

