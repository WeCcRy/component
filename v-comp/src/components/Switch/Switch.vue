<template>
    <div class="wy-switch" :class="{
        [`wy-switch--${size}`]: props.size,
        'is-disabled': props.disabled,
        'is-checked': checked,
    }" @click="switchVal">
        <input class="wy-switch__input" role="switch" :name="props.name" type="checkbox" :disabled="props.disabled"
            :checked="checked" />
        <div class="wy-switch__core">
            <div class="wy-switch__core-inner">
                <span class="wy-switch__core-inner-text">{{ switchText }}</span>
            </div>
            <div class="wy-switch__core-action"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({
    name: 'WySwitch',
    // 阻止将非props属性传递到根元素上
    inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps>(), {
    modelValue: true,
    disabled: false,
    activeValue: true,
    inActiveValue: false,
    activeText: 'ON',
    inActiveText: 'OFF',
})

const emits = defineEmits<SwitchEmits>()
const innerVal = ref(props.modelValue)
console.log('innerVal', innerVal.value)
console.log('props.activeValue', props.activeValue)
const checked = computed(() => {
    return innerVal.value === props.activeValue
})
const switchText = computed(() => {
    return checked.value ? props.activeText : props.inActiveText
})
console.log('checked', checked.value)

const switchVal = () => {
    if (props.disabled) return
    // 当 checked 为 true 时，设置为 props.inActiveValue，否则设置为 props.activeValue
    const newValue = checked.value ? props.inActiveValue : props.activeValue
    innerVal.value = newValue
    emits('update:modelValue', newValue)
    emits('change', newValue)
}

watch(() => props.modelValue, (val) => {
    innerVal.value =val 
})
</script>

<style scoped></style>