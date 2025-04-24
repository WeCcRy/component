export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' // 定义Button类型
export type ButtonSize = 'large' | 'small' // 定义Button大小类型
export type NativeType = 'button' | 'submit' | 'reset' // 定义原生按钮类型,对应原生button的type属性


export interface ButtonProps {
  type?: ButtonType // 按钮类型
  size?: ButtonSize // 按钮大小
  plain?: boolean // 是否是朴素按钮
  round?: boolean // 是否是圆角按钮
  circle?: boolean // 是否是圆形按钮
  disabled?: boolean // 是否禁用按钮
  nativeType?: NativeType // 原生按钮类型
  autofocus?: boolean // 是否自动获取焦点
}


export interface ButtonInstance {
    ref: HTMLButtonElement // 按钮的ref
}