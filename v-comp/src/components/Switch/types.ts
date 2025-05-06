export type SwitchValueType = boolean | string | number

export interface SwitchProps {
    modelValue: SwitchValueType,
    size?: 'large' | 'small',
    disabled?: boolean,
    activeText?: string,
    inActiveText?: string,
    id?: string,
    name?: string,
    activeValue?:SwitchValueType,
    inActiveValue?:SwitchValueType,
}


export interface SwitchEmits {
    (e: 'update:modelValue', value: SwitchValueType): void
    (e: 'change', value: SwitchValueType): void
}