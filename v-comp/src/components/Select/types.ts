import type {VNode} from 'vue'

export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

// 支持用户传入自定义渲染函数
// 该函数接收一个参数，返回一个虚拟节点
export type RenderCustom = (option: SelectOption) => VNode
export type FilterCustom = (label:string)=>SelectOption[]
export type remoteCustom = (label:string)=>Promise<SelectOption[]>


export interface SelectProps {
    modelValue: string|number;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    renderCustom?: RenderCustom;
    filterable?: boolean;
    filterMethod?: FilterCustom
    remote?: boolean;
    remoteMethod?: remoteCustom;
}


export interface SelectType {
    inputValue: string|number;
    selectedOption:null|SelectOption;
    isHover: boolean;
    loading: boolean;
    hightLightIndex: number;
}

export interface SelectEmits {
    (e: 'update:modelValue', value: string|number): void;
    (e: 'change', value: string|number): void;
    (e:'visible-change', value: boolean): void;
    (e:'clear'): void;
}

