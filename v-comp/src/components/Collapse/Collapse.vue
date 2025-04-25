<template>
    <div class = 'wy-collapse'>
<slot></slot>
    </div>
</template>

<script setup lang="ts">
import type { NameType } from './types';
import { ref,provide } from 'vue';
import {CollapseContextKey} from './types';

defineOptions({
    name: 'WyCollapse',
    inheritAttrs: false,
});

const activeNames = ref<NameType[]>([]);
// 点击事件，根据传入的 name 来切换折叠项的展开和收起状态
const handleClick = (name: NameType) => {
    const index = activeNames.value.indexOf(name);
    if (index === -1) {
        activeNames.value.push(name);
    } else {
        activeNames.value.splice(index, 1);
    }
};

// 提供给子组件的上下文，包含当前展开的折叠项名称和点击事件处理函数
provide(CollapseContextKey,{
    activeNames,
    handleClick,
});
</script>
