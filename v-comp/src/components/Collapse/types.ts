import type { Ref,InjectionKey } from 'vue'

export type NameType = string | number

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
    activeNames: Ref<NameType[]>
    handleClick: (name: NameType) => void
}

// Collapse组件的输入属性
export interface CollapseProps {
    modelValue: NameType[]
    accordion?: boolean
}

// Collapse组件的输出事件
export interface CollapseEmits {
    (e: 'update:modelValue', value: NameType[]): void
    (e: 'change', value: NameType[]): void
}

// 'CollapseContextKey'为对Symbol的类型注解
// 向外暴露常量CollapseContextKey，其类型为InjectionKey<CollapseContext>，即用于Provide/Inject的键，对应的值必须为CollapseContext
export const CollapseContextKey : InjectionKey<CollapseContext> = Symbol('CollapseContextKey')