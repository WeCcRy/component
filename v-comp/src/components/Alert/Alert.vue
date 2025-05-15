<template>
    <div>
    <Transition name="fade"> 
        <div class="wy-alert" :class="{
            [`wy-alert--${type}`]: type, // ${type}会接受props传入的type，随后动态生成类名
            'is-closeable': closeable, // 是否可关闭 
            'is-dark': effect === 'dark', // 如果效果是暗色，则添加暗色类名
        }" v-if=isShow>
            {{ content }}
            <div>
                <slot></slot> <!-- 插槽，用于在组件中插入内容 -->
            </div>
            <Icon icon="xmark" style="cursor: pointer;" @click="deleteAlert" v-show="closeable"></Icon>
        </div>
    </Transition>
    </div>
</template>

<script setup lang="ts">
import type { AlertProps } from './types'
import Icon from '../Icon/Icon.vue';
import { ref } from 'vue';
defineOptions({
    name: 'WyAlert',
})
defineProps<AlertProps>()

const isShow = ref(true)

const deleteAlert = () => {
    isShow.value = false // 关闭提示框
}
</script>

<style scoped></style>