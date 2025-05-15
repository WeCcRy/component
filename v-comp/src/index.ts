import type {App} from "vue";
import Button from "./components/Button/index";
import Alert from "./components/Alert/Index";
import Dropdown from "./components/Dropdown/index";
import Select from "./components/Select/index";
import Collapse from "./components/Collapse/index";
import {CollapseItem} from "./components/Collapse/index";
import Form from "./components/Form/index";
import {FormItem} from "./components/Form/index";
import Icon from "./components/Icon/index";
import Input from "./components/Input/index";
import Message,{createMessage,destoryAllMessage} from "./components/Message/index";
import Switch from "./components/Switch/index";
import Tooltip from "./components/Tooltip/index";

import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './styles/index.css';

library.add(fas)

const components = [
  Button,
  Alert,
    Dropdown,
    Select,
    Collapse,
    CollapseItem,
    Form,
    FormItem,
    Icon,
    Input,
    Message,
    Switch,
    Tooltip
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!,component);
  });
};

// 通过app.use()安装时，调用传入对象身上的insatll方法，所以返回格式是对象
export default {install};

// 再提供按需导入方式，可以引入针对性的组件
export {
    Button,
    Alert,
    Dropdown,
    Select,
    Collapse,
    CollapseItem,
    Form,
    FormItem,
    Icon,
    Input,
    Message,
    createMessage,
    destoryAllMessage,
    Switch,
    Tooltip
}