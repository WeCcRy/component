export interface InputProps {
    modelValue: string ,
    type: string,
    size?:'large' | 'small' ,
    disabled?: boolean,
    clearable?: boolean,
    showPassword?: boolean,
    placeholder?: string,
    readonly?: boolean,
    autocomplete?: string,
    autofocus?: boolean,
    form?: string,
}

export interface InputEmits {
    (e: 'update:modelValue', value: string): void
    // change事件当input失去焦点，且值发生改变的时候发生，意思是用户输入完毕，点击其他区域时
    // input组件失去焦点时才触发
    (e:'change' , value: string): void
    // input事件是input组件值发生改变时触发，意思是用户正在输入的时候触发，会捕获用户每次输入的情况
    (e:'input', value: string): void
    (e:'focus' , value: FocusEvent): void
    (e:'blur' , value: FocusEvent): void
    (e:'clear'): void
}

export interface InputInstance {
    ref:HTMLInputElement|HTMLTextAreaElement
}