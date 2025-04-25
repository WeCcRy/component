<template>
    <div class='wy-collapse'>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import type { NameType, CollapseProps, CollapseEmits } from './types';
import { ref, provide, watch } from 'vue';
import { CollapseContextKey } from './types';

defineOptions({
    name: 'WyCollapse',
    inheritAttrs: false,
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

const activeNames = ref<NameType[]>(props.modelValue);
if (props.accordion && activeNames.value.length > 1) {
    console.warn('Accordion mode only allows one active item.')
}
watch(()=> {
    return props.modelValue;
}, (newVal) => {
    activeNames.value = newVal; // 监听 v-model 的变化，更新 activeNames
});
// 点击事件，根据传入的 name 来切换折叠项的展开和收起状态
const handleClick = (name: NameType) => {
    if (props.accordion) {
        console.log('accordion', activeNames.value[0], name)
        activeNames.value = activeNames.value[0] === name ? [''] : [name]; // 如果是手风琴模式，只保留当前项
    } else {
        const index = activeNames.value.indexOf(name);
        if (index === -1) {
            activeNames.value.push(name);
        } else {
            activeNames.value.splice(index, 1);
        }
    }
    // 更新 v-model 的值
    emits('update:modelValue', activeNames.value)
    emits('change', activeNames.value)
};

// 提供给子组件的上下文，包含当前展开的折叠项名称和点击事件处理函数
provide(CollapseContextKey, {
    activeNames,
    handleClick,
});
</script>
