<template>
    <Transition name = "fade"> <!-- 过渡动画，淡入淡出 -->
    <div class = "wy-alert" :class="{
        [`wy-alert--${type}`]: type, // ${type}会接受props传入的type，随后动态生成类名
        'is-closeable': closeable, // 是否可关闭 
        'is-dark': effect === 'dark', // 如果效果是暗色，则添加暗色类名
    }" v-show = isShow>
        {{content}}
        <div>
            <slot></slot> <!-- 插槽，用于在组件中插入内容 -->
        </div>
        <Icon icon="xmark" style="cursor: pointer;" @click="deleteAlert" v-show="closeable"></Icon>
    </div>
</Transition>
</template>

<script setup lang="ts">
import type { AlertProps } from './types'
import Icon from '../Icon/Icon.vue';
import { ref } from 'vue';
defineProps<AlertProps>()

const isShow = ref (true)

const deleteAlert = () => {
    isShow.value = false // 点击关闭按钮时，设置 isShow 为 false，隐藏 Alert 组件
}
</script>

<style lang="scss" scoped>

</style>