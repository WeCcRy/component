import type { InjectionKey } from "vue";
import type { RuleItem,ValidateError,ValidateFieldsError } from "async-validator";


export interface FormItemProps {
    label?: string;
    // prop用于传入校验规则
    prop?:string;
}

// 多一个trigger属性用于判断触发的时机
export interface FormItemRules extends RuleItem{
    trigger?: string;
}
export type FormRules = Record<string, FormItemRules[]>;


export interface FormProps {
    model: Record<string, any>;
    rules?: FormRules;
}

export interface FormValidateError {
    errors: ValidateError[];
    fields: ValidateFieldsError;
}

export interface FormContext extends FormProps {
    addField: (field: FormItemContext) => void;
    removeField: (field: FormItemContext) => void;
}

export interface FormItemContext {
    validate: (trigger?:string) => Promise<any>;
    prop?: string;
    resetField: () => void;
    clearValidate: () => void;
}

export interface FormInstance {
    validate:()=> Promise<any>;
    resetFields: (props?:string[]) => void;
    clearValidate: (props?:string[]) => void;
}

export const formContextKey :InjectionKey<FormContext>= Symbol("formContextKey");
export const formItemContextKey :InjectionKey<FormItemContext>= Symbol("formItemContextKey");