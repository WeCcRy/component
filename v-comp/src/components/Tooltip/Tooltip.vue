<template>
    <div class="wy-tooltip" v-on="outerEvent" ref="popperElement">
        <div class="wy-tooltip__trigger" ref="triggerNode" @click="triggerPopper" v-on="event">
            <slot></slot>
        </div>
        <Transition :name="transition" @after-leave="onAfterLeave">
            <div class="wy-tooltip__popper" ref="popperNode" v-if="isOpen">
                <slot name="content"></slot>
                <div id="arrow">
                </div>
                {{ content }}
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types';
import { ref, watch, reactive, onUnmounted, Transition,computed } from 'vue';
import type { Instance } from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';
defineOptions({
    name: 'WyTooltip',
})
const props = withDefaults(defineProps<TooltipProps>(), {
    placement: "right",
    transition: "fade",
    openDelay: 100,
    closeDelay: 100,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false) // 控制popper是否显示
const triggerNode = ref<HTMLElement | null>(null) // 触发器节点
const popperNode = ref<HTMLElement | null>(null) // popper节点
const popperElement = ref<HTMLElement | null>(null) // popper元素
let popperInstance: Instance | null = null  // popper实例


const event: Record<string, any> = reactive({}) // 事件对象
const outerEvent: Record<string, any> = reactive({}) // 外部事件对象
const popperOptions = computed(() => {
    return {
        placement: props.placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            }
        ],
        ...props.popperOptions
    }
})

useClickOutside(popperElement, () => {
    if (props.trigger === 'click' && isOpen.value && !props.manaul) {
        isOpen.value = false // 点击外部区域时关闭popper
        emits('visible-change', isOpen.value) // 触发 visible-change 事件
    }
    if(isOpen.value) {
        emits('click-outside')
    }
})

const open = () => {
    isOpen.value = true // 显示popper
    emits('visible-change', isOpen.value) // 触发 visible-change 事件
}

const close = () => {
    isOpen.value = false // 关闭popper
    emits('visible-change', isOpen.value) // 触发 visible-change 事件
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

// 最终执行打开时，停止关闭的防抖函数
const openFinal = () => {
    closeDebounce.cancel() // 取消关闭的防抖函数
    openDebounce() // 执行打开的防抖函数
}

// 最终执行关闭时，停止打开的防抖函数
const closeFinal = () => {
    openDebounce.cancel() // 取消打开的防抖函数
    closeDebounce() // 执行关闭的防抖函数
}

const triggerPopper = () => {
    if (isOpen.value) {
        closeFinal()
    } else {
        openFinal()
    }
}

const attachEvents = () => {
    if (props.trigger === 'hover') {
        // 如果触发方式是 hover，则在 mouseenter 和 mouseleave 事件上添加事件监听器
        outerEvent['mouseenter'] = () => {
            openFinal()
        }
        outerEvent['mouseleave'] = () => {
            closeFinal()
        }
    } else if (props.trigger === 'click') {
        // 如果触发方式是 click，则在 click 事件上添加事件监听器
        event['click'] = () => {
            triggerPopper()
        }
    }
}
if (!props.manaul) {
    attachEvents()
}

const onAfterLeave = () => {
    // 过渡动画结束后，销毁 popper 实例
    if (popperInstance) {
        popperInstance?.destroy()
    }
}
watch(() => props.manaul, (newVal => {
    if (newVal) {
        Object.keys(outerEvent).forEach(key => delete outerEvent[key])
        Object.keys(event).forEach(key => delete event[key])
    }
}))

// 因为传入的trigger是响应式，所以需要监听trigger的变化
watch(() => props.trigger, (newVal, oldVal) => {
    // 监听 trigger 属性的变化
    if (newVal !== oldVal) {
        // 如果 trigger 属性发生变化，则清除原有事件监听器并重新添加
        Object.keys(outerEvent).forEach(key => delete outerEvent[key])
        Object.keys(event).forEach(key => delete event[key])
        attachEvents()
    }
})

watch(isOpen, (newVal) => {
    if (newVal) {
        if (triggerNode.value && popperNode.value) {
            // 如果 isOpen 为 true，则创建 Popper 实例
            popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
            console.log(popperInstance)
        }
    }
}, { flush: 'post' }) // 在DOM更新后执行watch函数

onUnmounted(() => {
    popperInstance?.destroy() // 组件卸载时销毁popper实例
})

defineExpose<TooltipInstance>({
    name: "wy-tooltip",
    open: openFinal,
    close: closeFinal,
    isOpen
})
</script>

<style scoped></style>