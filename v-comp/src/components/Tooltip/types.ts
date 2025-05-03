import type { Placement } from '@popperjs/core'

export interface TooltipProps {
  content?: string
  placement?: Placement
  trigger?: 'hover' | 'click'
  manaul?: boolean
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
    // 用于向父组件告知tooltip的可见性变化
  (e: 'visable-change', value: boolean): void
}

export interface TooltipInstance{
  name:string
  open:() => void
  close:() => void
}
