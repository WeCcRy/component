import type { VNode,ComponentInternalInstance } from 'vue'

export interface MessageProps {
  id?: string
  message?: string | VNode
  type?: 'success' | 'danger' | 'info' | 'warning'
  duration?: number
  showClose?: boolean
  onDestroy?: () => void
  offset?: number
  zIndex?: number
}

export interface MessageContext {
  id: string
  message: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  destroy: () => void
}

// 将 MessageProps 中的 onDestroy 属性排除掉，返回一个新的类型
// 内部使用时，onDestroy 是一个函数，用于销毁消息组件
// 但是在外部使用时，我们不需要传入这个属性，所以我们将其排除掉
export type CreateMessageProps = Omit<MessageProps, 'onDestroy' |'id'|'zIndex'>
