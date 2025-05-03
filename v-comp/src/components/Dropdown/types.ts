import type { VNode } from 'vue'
import type { TooltipProps } from '../Tooltip/types'

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOptions[]
  hideAfterSelect?: boolean

}

export interface MenuOptions {
  label: string | VNode
  key: string | number
  disabled?: boolean
  divided?: boolean
}

export interface DropdownEmits {
  (e: 'select', key: MenuOptions): void
  (e: 'visible-change', visible: boolean): void
}

export interface DropdownInstance {
    open: () => void
    close: () => void
}