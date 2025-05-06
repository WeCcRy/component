import { computed, ref } from "vue";

const zIndex = ref(0)
const useZIndex = (initialVal=5000) => {
    const initialZIndex = ref(initialVal || 0)
    const currentZIndex = computed(() => zIndex.value + initialZIndex.value)
    const nextIndex = () => {
        zIndex.value += 1
        return currentZIndex
    }
    return {
        initialZIndex,
        currentZIndex,
        nextIndex
    }
}

export default useZIndex