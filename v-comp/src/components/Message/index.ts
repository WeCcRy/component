// 安装并向外暴露组件
import Message from "./Message.vue";
import type { App } from "vue";
import {createMessage,destoryAllMessage} from "./method"

// 使用app.use()时，对调用对象上的install方法
Message.install = (app: App) => {
  app.component(Message.name || "WyMessage", Message);
}

export default Message;
export { createMessage,destoryAllMessage }
export *  from "./types";

