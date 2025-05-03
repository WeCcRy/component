<template>
    <button class="wy-button" :class="{ // :class语法中，前面是键名，后面是布尔表达式(必定转换成boolean值)，[]表示动态类名
        [`wy-button--${type}`]: type, // ${type}会接受props传入的type，随后动态生成类名
        [`wy-button--${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading,
    }" :disabled="disabled || loading" :type="nativeType" :autofocus="autofocus" ref="_ref">
        <Icon icon='spinner' v-if="loading" spin></Icon>
        <Icon :icon="icon" v-if="icon"></Icon>
        <span>
            <slot></slot> <!-- 插槽，用于在组件中插入内容 -->
        </span>
    </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue';
import { ref } from 'vue'

// 定义组件名称
defineOptions({
    name: 'WyButton', // 组件名称
})
// 定义该组件可以接收哪些 props 参数以及它们的类型。使用withDefaults函数来设置默认值
withDefaults(defineProps<ButtonProps>(), {
    nativeType: 'button', // 原生类型，默认值为 button
    icon: '', // 默认值为空字符串，确保 icon 不为 undefined
    loading:false
})

const _ref = ref<HTMLButtonElement>() // ref 用于获取 DOM 元素的引用

defineExpose({
    ref: _ref, // 将 _ref 暴露出去，使得外界可以访问到这个 DOM 元素的引用
})
</script>

<style scoped></style>