export interface AlertProps {
    content?: string // 提示内容
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' // 提示类型
    effect?: 'dark' | 'light' // 提示效果
    closeable?: boolean // 是否可关闭
}