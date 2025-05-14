<template>
    <div class="wy-form-item" :class="{
        'is-error': validateState.state==='error',
        'is-success': validateState.state==='success',
        'is-loading': validateState.loading,
        'is-required': isRequired,
    }">
        <div class="wy-form-item__label">
            <!-- 作用域插槽 -->
            <!-- 父组件使用#label来自定义label的内容，并可以接受到子组件传出的label的值，{{ label }}是父组件没有声明插槽时的默认渲染 -->
            <slot name="label" :label="label">{{ label }}</slot>
        </div>
        <div class="wy-form-item__content">
            <slot name="content":validate="validate"></slot> <!-- 作用域插槽，父组件可以调用validate方法来手动添加校验 -->
            <div v-if="validateState.state==='error'" class = "wy-form-item__content-error">{{ validateState.errorMessage }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormItemProps, FormContext, FormValidateError,FormItemContext} from '../types';
import {isNil} from 'lodash-es' // 引入lodash-es的isNil函数，用于判断值是否为null或undefined
import { formContextKey,formItemContextKey } from '../types'
import { computed, inject, reactive ,provide,onMounted,onUnmounted} from 'vue'
import Schema from 'async-validator' // 引入async-validator的Schema类型

const props = defineProps<FormItemProps>()

const formContext = inject<FormContext>(formContextKey) // 获取父组件的上下文

let initialValue: any = null // input初始值

const isRequired =computed(() => {
    const rules = formContext?.rules
    if (rules && props.prop && !isNil(rules[props.prop])) {
        return rules[props.prop].some((rule) => rule.required) // 判断规则中是否有required属性
    }
    return false
})

// 从Provide中获取值
// input中的显示内容
const innerValue = computed(() => {
    const model = formContext?.model
    if (model && props.prop && !isNil(model[props.prop])) {
        return model[props.prop]
    }
})

const itemRules = computed(() => {
    const rules = formContext?.rules
    if (rules && props.prop && !isNil(rules[props.prop])) {
        return rules[props.prop]
    }
})

const validateState = reactive({
    state : 'init',
    errorMessage :'',
    loading:false
})

const getTriggerRules = (trigger?:string)=>{
    const rules = itemRules.value
    if (rules && rules.length) {
        return rules.filter((rule) => {
            if(!trigger) return true // 如果没有传入trigger，则返回所有规则            
            if (rule.trigger && rule.trigger.length>0) {
                return rule.trigger.includes(trigger) 
            }
        })
    }else{
        return []
    }
}

const clearValidate = () => {
    validateState.state = 'init'
    validateState.errorMessage = ''
    validateState.loading = false
}

const resetField = () => {
    clearValidate()
    const model = formContext?.model
    if (model && props.prop && !isNil(model[props.prop]))  {
        model[props.prop] = initialValue // initialValue在挂载的时候记录了input的默认输入，重置时将其赋值给model[props.prop]，model[props.prop]发生改变时，会导致innerValue的重新计算
    }
}

const validate = async (trigger?:string) => {
    const validateName = props.prop
    const rules =  getTriggerRules(trigger);

    console.log("rules",rules)
    if (validateName) {
        validateState.loading = true
        const validator = new Schema({
            [validateName]: rules
        })
        // 校验该对象是否符合规则，props.prop需要对应validateName的值
        let validateObj = { [props.prop]: innerValue.value }
        return validator.validate(validateObj)
            //validate方法返回一个Promise对象，校验成功时resolve，校验失败时reject
            .then(() => {
                validateState.state = 'success'
                console.log('校验通过')
            })
            // e包含errors和fields
            .catch((e:FormValidateError) => {
                const {errors} = e // 获取错误信息
                validateState.state = 'error'
                validateState.errorMessage = errors[0].message || '' // 获取第一个错误信息
                console.log('校验失败', e.fields)
                return Promise.reject(e) // 返回一个拒绝的Promise对象
            })
            .finally(() => {
                validateState.loading = false // 校验完成后将loading状态设置为false
            })
    }
}

const formItemContext = {
    validate,  // 验证方法
    prop:props.prop,  // 验证的字段名
    clearValidate, // 清除校验状态
    resetField,  // 重置表单项
}

provide(formItemContextKey, formItemContext) // 提供给子组件使用

onMounted(() => {
    formContext?.addField(formItemContext) // 在组件挂载时将当前组件添加到父组件的fieldList中
    initialValue = innerValue.value // 将初始值赋值给innerValue
})
onUnmounted(() => {
    formContext?.removeField(formItemContext) // 在组件卸载时将当前组件从父组件的fieldList中移除
})
</script>

<style scoped></style>