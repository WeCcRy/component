<template>
    <Transition name="fade" @enter="setHeight" @after-leave="destroyComponent">
        <div class='wy-message' :class="{ [`wy-message--${type}`]: type, 'is-close': showClose }" role="alert"
            v-show="visible" ref="messageRef" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
            <div class='wy-message__content'>
                <slot>
                    <RenderVNode :vNode="message" v-if="message"></RenderVNode>
                </slot>
            </div>
            <div class='wy-message__close' @click.stop="() => visible = false" v-if="showClose">
                <Icon icon="xmark"></Icon>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import type { MessageProps } from './types';
import Icon from '../Icon/Icon.vue';
import RenderVNode from '../Common/RenderVNode.ts';
import { getLastOffset } from './method.ts';
import { computed, onMounted, ref, watch, nextTick } from 'vue';
import useEventListener from '@/hooks/useEventListener.ts';

const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    message: '这是一条消息',
    duration: 3000,
    showClose: true,
    offset: 20,
});

let visible = ref<boolean>(false)

// 本组件高度
const height = ref<number>(0)
// 上一组件底部
const lastOffset = computed(() => getLastOffset(props.id!))
// 本组件底部
const topoffset = computed(() => {
    return lastOffset.value + props.offset
})
// 传递给其他组件的本组件底部
const bottomOffset = computed(() => {
    return topoffset.value + height.value
})
const cssStyle = computed(() => {
    return {
        top: `${topoffset.value}px`,
        zIndex: props.zIndex
    }
})

// 处理键盘事件，按下Esc键关闭消息提示
const handleKeydown = (e: Event) => {
    const event = e as KeyboardEvent
    if (event.code === 'Escape') {
        visible.value = false
    }
}
useEventListener(document, 'keydown', handleKeydown)

const messageRef = ref<HTMLDivElement | null>(null)
let timer: any
function startTimer() {
    if (props.duration === 0) return
    timer = setTimeout(() => {
        visible.value = false
    }, props.duration)
}

function clearTimer() {
    console.log(timer)

    if (timer) {
        console.log('clearTimer')
        clearTimeout(timer)
        timer = null
    }
}

const setHeight = () => {
    height.value = messageRef.value!.getBoundingClientRect().height
    console.log('setHeight', height.value)
}
const destroyComponent = () => {
    if (props.onDestroy) {
        props.onDestroy()
    }
    visible.value = false
}

onMounted(() => {
    visible.value = true
    startTimer()
})

defineExpose({
    bottomOffset,
    visible
})
</script>

<style scoped></style>