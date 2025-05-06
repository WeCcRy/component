<template>
    <div class='wy-input' :class="{
        [`wy-input--${type}`]: type,
        [`wy-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus,
    }">
        <!-- input -->
        <template v-if="type !== 'textarea'">
            <!-- prepend -->
            <div v-if="$slots.prepend" class="wy-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <!-- input框 -->
            <div class='wy-input__wrapper'>
                <!-- prefix -->
                <span v-if="$slots.prefix" class="wy-input__prefix">
                    <slot name="prefix"></slot>
                </span>
                <!-- input -->
                <input ref="inputRef" class='wy-input__inner' v-bind="attrs"
                    :type="showPassword && !eyeIconVisable ? 'password' : type" :disabled="disabled" :value="innerVal"
                    @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"
                    :placeholder="placeholder" :readonly="readonly" :autocomplete="autocomplete" :autofocus="autofocus"
                    :form="form" />
                <!-- suffix -->
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="wy-input__suffix" @click="keepFocus">
                    <!-- 当点击Icon时，Input会失去焦点，导致showClear为false，从而不显示Icon，导致无法触发点击事件 -->
                    <!-- mousedown事件发生于click事件前，添加prevent修饰符从而阻止浏览器的默认行为（mousedown时失去焦点） -->
                    <Icon icon="circle-xmark" class="wy-input__clear" v-if="showClear" @click="clearInput" @mousedown.prevent="NOOP"></Icon>
                    <Icon :icon="passwordIcon" v-if="showPasswordArea" @click="clickEyeIcon" class="wy-input__password">
                    </Icon>
                    <slot name="suffix"></slot>
                </span>
            </div>
            <div v-if="$slots.append" class="wy-input__append">
                <slot name="append"></slot>
            </div>
        <!-- textarea -->
        </template>
        <template v-if="type==='textarea'">
            <textarea ref="inputRef" class='wy-textarea__wrapper' v-bind="attrs" :disabled="disabled" v-model="innerVal"
                @focus="handleFocus" @blur="handleBlur" :placeholder="placeholder" :readonly="readonly"
                :autocomplete="autocomplete" :autofocus="autofocus" :form="form">
            </textarea>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from './types'
import { computed, ref, watch, type Ref, useAttrs,nextTick } from 'vue'
import Icon from '../Icon/Icon.vue'


defineOptions({
    name: 'Input',
    // 阻止将非props属性传递到根元素上
    inheritAttrs: false,
})

const inputRef = ref(null) as Ref<HTMLInputElement | null>

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    placeholder: '',
    readonly: false,
    disabled: false,
    autofocus: false,
})
const emits = defineEmits<InputEmits>()

const NOOP = () => {
    // do nothing
}

const attrs = useAttrs()

const innerVal = ref(props.modelValue)

const isFocus = ref(false)

const showClear = computed(() => {
    return props.clearable && !props.disabled && isFocus.value && !!innerVal.value
})

// 使用该属性来控制是否为密码框
const showPasswordArea = computed(() => {
    return props.showPassword && !!innerVal.value && !props.disabled
})

// 切换密码框的显示和隐藏
const eyeIconVisable = ref(false)

const passwordIcon = computed(() => {
    return eyeIconVisable.value ? 'eye' : 'eye-slash'
})

const clickEyeIcon = () => {
    eyeIconVisable.value = !eyeIconVisable.value
}

const keepFocus = async() => {
    await nextTick()
    inputRef.value?.focus()
}

const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    innerVal.value = target.value
    emits('update:modelValue', innerVal.value)
    emits('input', innerVal.value)
}

const handleChange = (e: Event) => {
    emits('change', innerVal.value)
}

const handleFocus = (e: FocusEvent) => {
    isFocus.value = true
    emits('focus', e)
}

const handleBlur = (e: FocusEvent) => {
    isFocus.value = false
    emits('blur', e)

}

const clearInput = () => {
    innerVal.value = ''
    emits('update:modelValue', innerVal.value)
    emits('clear')
    emits('input', '')
    emits('change', '')
}

watch(() => props.modelValue, (newVal) => {
    innerVal.value = newVal
})

defineExpose({
    ref: inputRef,
})

</script>

<style lang="scss" scoped></style>