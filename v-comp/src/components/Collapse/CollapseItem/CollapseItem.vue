<template>
    <div 
    class = 'wy-collapse-item'
    :class="{
        'is-disabled':disabled
    }">
        <div class = wy-collapse-item__header :id="`item_header-${name}`" @click = handleClick(String(name))>
            <slot name = 'title'>{{title}}</slot>
            </div>
            <div class ='wy-collapse-item_content' :id="`item_content-${name}`" v-show = isActive>
                <slot></slot>
            </div>
</div>
</template>

<script setup lang="ts">
import type { CollapseItemProps,CollapseContext } from '../types';
import {CollapseContextKey} from '../types';
import {computed, inject} from 'vue';
defineOptions({
    name: 'WyCollapseItem',
    inheritAttrs: false,
});
const props = defineProps<CollapseItemProps>();


const CollapseContext = inject<CollapseContext>(CollapseContextKey) // 因为key是Symbol类型，所以不能直接使用'CollapseContextKey'
const isActive = computed(() => {
    return CollapseContext?.activeNames.value.includes(props.name)
});

const handleClick = (name:string) => {
    if (props.disabled) return; // 如果当前项被禁用，则不执行点击事件
    CollapseContext?.handleClick(name); // 调用父组件的点击事件处理函数
};
</script>
