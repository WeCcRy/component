import { isRef, onBeforeUnmount, onMounted, unref, watch, type Ref } from 'vue'

export default function useEventListener(
  target: EventTarget | Ref<EventTarget | null>,
  event: string,
  handler: (e: Event) => any,
) {
  //判断 target 是否是一个 ref 对象，如果是，使用watch来监听它的变化，如果不是，直接在 mounted 生命周期中添加事件监听器
  if (isRef(target)) {
    watch(target, (newval, oldval) => {
      oldval?.removeEventListener(event, handler)
      newval?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }
  // 通过unref来获取target的值，并在组件卸载时移除事件监听器
  // unref(target) 是一个函数，它会返回 target 的值，如果 target 是一个 ref 对象，它会返回 ref 对象的值，否则返回 target 本身
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
