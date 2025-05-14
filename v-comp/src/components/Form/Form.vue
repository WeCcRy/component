<template>
    <div class="wy-form">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue';
import { formContextKey, type FormProps,type FormContext,type FormItemContext,type FormValidateError } from './types';
import type { ValidateFieldsError } from "async-validator";
const props = defineProps<FormProps>()

const fieldList:FormItemContext[] = []

const formContext:FormContext = {
    ...props,
    // 将子组件的实例添加到fieldList中
    addField(field) {
        fieldList.push(field)
    },
    // 从fieldList中移除子组件的实例
    removeField(field) {
        const index = fieldList.indexOf(field)
        if (index !== -1) {
            fieldList.splice(index, 1)
        }
    },
}

const resetFields =(keys:string[]=[])=>{
    const filteredFields = keys.length>0?fieldList.filter(field => keys.includes(field.prop!)):fieldList
    filteredFields.forEach(field => {
        field.resetField()
    })
}

const clearValidate = (keys:string[]=[])=>{
    const filteredFields = keys.length>0?fieldList.filter(field => keys.includes(field.prop!)):fieldList
    filteredFields.forEach(field => {
        field.clearValidate()
    })
}

const validate = async () =>{
    let errorList:ValidateFieldsError ={}
    for(const field of fieldList){
        try{
            await field.validate()
        } catch (e) {
            const error =e as FormValidateError
            errorList = {
                ...errorList,
                ...error.fields // 错误信息添加到errorList
            }
        }
    }
    if(Object.keys(errorList).length === 0) return Promise.resolve(true)
    return Promise.reject(errorList) // 返回错误信息
}

provide(formContextKey, formContext) // 提供给子组件使用

defineExpose({
    validate, // 将validate方法暴露给父组件
    resetFields,
    clearValidate,
})
</script>

<style scoped>

</style>