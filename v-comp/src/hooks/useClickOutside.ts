import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
const useClickOutside = (element: Ref<HTMLElement | null>, callback: () => void) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (element.value && event.target) {
      if (!element.value.contains(event.target as HTMLElement)) {
        callback()
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}

export default useClickOutside 