<template>
    <Tooltip class="wy-dropdown" :trigger="trigger" :placement="placement" :open-delay="openDelay" :close-delay="closeDelay"
        @visbile-change="visableChange" ref="tooltipRef" >
        <slot></slot>
        <template #content>
            <ul class="wy-dropdown__menu">
                <template v-for="(item, index) in menuOptions" :key="item.key" class="wy-dropdown__item">
                    <li v-if="item.divided" role="separator" class="divided-item">
                    </li>
                    <li class="wy-dropdown__item" @click="handleClick(item)"
                        :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
                        :id="`dropdown-item-${item.key}`">
                    <RenderVNode :vNode = "item.label" />
                     <!-- {{ item.label }} -->
                    </li>
                </template>

            </ul>
        </template>
    </Tooltip>
</template>

<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import RenderVNode from '../Common/RenderVNode';
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOptions } from './types';
import { ref,withDefaults } from 'vue';
import type { TooltipInstance } from '../Tooltip/types';

const props = withDefaults(defineProps<DropdownProps>(),{hideAfterSelect: true});
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref<TooltipInstance|null>(null); // Tooltip 组件的引用
const visableChange = (visable: boolean) => {
    emits('visible-change', visable);
};
const handleClick = (item: MenuOptions) => {
    if (item.disabled) return;
    emits('select', item);
    if (props.hideAfterSelect){
        tooltipRef.value?.close()
        emits('visible-change', false); // 选中后关闭下拉菜单   
    }
}

defineExpose({
    open: () => {
        tooltipRef.value?.open(); // 调用 Tooltip 组件的 open 方法
    },
    close: () => {
        tooltipRef.value?.close(); // 调用 Tooltip 组件的 close 方法
    },
})

</script>

<style scoped></style>