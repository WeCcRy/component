<template>
    <div class='wy-collapse-item'>
        <div class=wy-collapse-item__header :id="`item_header-${name}`" @click=handleClick(String(name)) :class="{
        'is-disabled': disabled,
        'is-active': isActive,
    }">
            <slot name='title'>{{ title }}</slot>
        </div>
        <Transition name="slide" v-on="transitionEvents">
            <div class="vk-collapse-item__wrapper" v-show="isActive">
                <div class='wy-collapse-item__content' :id="`item_content-${name}`">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { CollapseItemProps, CollapseContext } from '../types';
import { CollapseContextKey } from '../types';
import { computed, inject } from 'vue';
defineOptions({
    name: 'WyCollapseItem',
    inheritAttrs: false,
});
const props = defineProps<CollapseItemProps>();


const CollapseContext = inject<CollapseContext>(CollapseContextKey) // 因为key是Symbol类型，所以不能直接使用'CollapseContextKey'
const isActive = computed(() => {
    return CollapseContext?.activeNames.value.includes(props.name)
});

const handleClick = (name: string) => {
    if (props.disabled) return; // 如果当前项被禁用，则不执行点击事件
    CollapseContext?.handleClick(name); // 调用父组件的点击事件处理函数
};

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
    beforeEnter(el) {
        el.style.height = '0px';
        el.style.overflow = 'hidden'
    },
    enter(el) {
        el.style.height = `${el.scrollHeight}px`;
    },
    afterEnter(el) {
        el.style.height = '';
    },
    beforeLeave(el) {
        el.style.height = `${el.scrollHeight}px`;
    },
    leave(el) {
        el.style.height = '0px';
        el.style.overflow = 'hidden'

    },
    afterLeave(el) {
        el.style.height = '';
    },
};
</script>
