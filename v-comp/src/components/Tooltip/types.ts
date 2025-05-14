import type { Placement } from '@popperjs/core'

export interface TooltipProps {
  content?: string
  placement?: Placement
  trigger?: 'hover' | 'click'
  manaul?: boolean
  transition?: string
  openDelay?: number
  closeDelay?: number
  popperOptions?: Object
} 

export interface TooltipEmits {
    // 用于向父组件告知tooltip的可见性变化
  (e: 'visible-change', value: boolean): void
  (e: 'click-outside'): void

}

export interface TooltipInstance{
  name:string
  open:() => void
  close:() => void
  isOpen:boolean
}
