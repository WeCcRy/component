<template>
    <div class="wy-select" :class="{ 'is-disabled': disabled }" @mouseenter="inputItem.isHover = true"
        @mouseleave="inputItem.isHover = false" @keydown="keyEvent">
        <Tooltip placement="bottom-start" manaul ref="TooltipRef" @click="toggleClick" :popperOptions="popperOptions"
            @click-outside="clickOutside" >
            <!-- 作为trigger区域 -->
            <Input class="wy-input" v-model="inputItem.inputValue as string" :disabled="disabled" :placeholder="selectedPlaceholder"
                type="text" :readonly="!filterable || !isOpen" ref="inputRef" @input="onDebounceFilter">
            <template #suffix>
                <Icon icon="circle-xmark" v-if="showClear" @click.stop="clearInput" @mousedown.prevent="NOOP"></Icon>
                <Icon icon="arrow-down" v-else class="header-angle" :class="{ 'is-active': isOpen }"></Icon>
            </template>
            </Input>
            <!-- 作为popper区域 -->
            <template #content v-if="isOpen">
                <div class="wy-select-spin" v-if="inputItem.loading">
                    <Icon icon="spinner" spin></Icon>
                </div>
                <div class="wy-select-nodata" v-else-if="filterable && filterOptions.length === 0">无匹配数据</div>
                <ul class="wy-select__menu" v-else>
                    <li class="wy-select__menu-item" :class="{
                        'is-disabled': item.disabled,
                        'is-selected': inputItem.selectedOption?.value === item.value,
                        'is-highlight': index === inputItem.hightLightIndex,
                    }" :id="`select-item-${item.value}`" v-for="(item, index) in filterOptions" :key="index"
                        @click.prevent.stop=selectItem(item)>
                        <RenderVNode :vNode="props.renderCustom ? renderCustom(item) : item.label"></RenderVNode>
                    </li>
                </ul>
            </template>
        </Tooltip>

    </div>
</template>

<script setup lang="ts">
import type { SelectProps, SelectEmits, SelectOption, SelectType } from './types'
import RenderVNode from '../Common/RenderVNode'
import { isFunction, debounce } from 'lodash-es'
import type { TooltipInstance } from '@/components/Tooltip/types'
import type { InputInstance } from '@/components/Input/types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Input from '@/components/Input/Input.vue'
import { ref, reactive, type Ref, nextTick, watch, computed } from 'vue'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({
    name: 'WySelect',
})

const findOption = (val: string) => {
    const option = props.options.find((item) => item.value === val) // 查找选项
    if (option) {
        return option // 返回选项
    } else {
        return null // 如果没有找到，则返回null
    }
}

const props = withDefaults(defineProps<SelectProps>(), {
    modelValue: '',
    clearable: true,
    placeholder: "请选择",
    filterable: false,
    options: [] as SelectOption[]
})
const emits = defineEmits<SelectEmits>()

const TooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const isOpen = ref(false) // 控制popper是否显示
const initialOption = findOption(props.modelValue as string) // 查找初始选项
const inputItem = reactive<SelectType>({
    inputValue: initialOption ? initialOption.label : '',
    selectedOption: initialOption,
    isHover: false, // 控制鼠标悬停的选项
    loading: false, // 控制loading状态
    hightLightIndex: -1
})

const filterOptions = ref(props.options) // 过滤后的选项
watch(() => props.options, (newVal) => {
    filterOptions.value = newVal // 监听选项变化
}, { deep: true })
const generateFilterOption = async (val: string) => {
    if (!props.filterable) return // 如果不可过滤，则返回
    if (props.filterMethod && isFunction(props.filterMethod)) {
        filterOptions.value = props.filterMethod(val) // 如果有自定义过滤方法，则调用
    } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
        try {
            inputItem.loading = true
            filterOptions.value = await props.remoteMethod(val)
        } catch (error) {
            console.log(error)
        } finally {
            inputItem.loading = false
        }
    } else {
        filterOptions.value = props.options.filter((item) => {
            return item.label.toLowerCase().includes(val.toLowerCase()) // 过滤选项
        })
    }
}
const onFilter = () => {
    generateFilterOption(inputItem.inputValue as string)
}

const debounceTime = computed(() => { return props.remote ? 300 : 0 }) // 如果是远程搜索，则设置防抖时间
const onDebounceFilter = debounce(() => {
    onFilter()
}, debounceTime.value) // 防抖函数

const selectedPlaceholder = computed(() => {
    if (inputItem.selectedOption) {
        return inputItem.selectedOption.label // 如果有选中的选项，则返回选项的label
    } else {
        return props.placeholder // 否则返回placeholder
    }
})

const popperOptions = {
    modifiers: [{
        name: "sameWidth",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect: ({ state }) => {
            state.elements.popper.style.width = `${state.elements.reference.offsetWidth
                }px`;
        }
    },
    {
        name: 'offset',
        options: {
            offset: [0, 6], // 设置偏移量，第一个值是 x 轴偏移，第二个值是 y 轴偏移
        },
    },
    ]
};

const NOOP = () => { } // 空函数    

const showClear = computed(() => {
    return props.clearable && inputItem.inputValue.trim() && inputItem.isHover && inputItem.selectedOption // 如果可清除且有值且鼠标悬停，则显示清除图标
})

const controlTooltip = async (val: boolean) => {
    if (val) {
        TooltipRef.value?.open() // 打开Tooltip
        isOpen.value = true // 设置isOpen为true
    } else {
        TooltipRef.value?.close() // 关闭Tooltip
        // isOpen.value = false close有动画，所以需要等动画结束后再设置isOpen为false
    }
    emits("visible-change", isOpen.value) // 触发 visible-change 事件

}

// 监听 Tooltip 组件的状态
watch(() => TooltipRef.value?.isOpen, (newValue) => {
    if (newValue === false) {
        isOpen.value = false
    }
})

const toggleClick = () => {
    if (props.disabled) return // 如果禁用，则不执行
    if (props.filterable && inputItem.selectedOption) {
        inputItem.inputValue = ''
        generateFilterOption(inputItem.inputValue)
    }
    if (isOpen.value) {
        controlTooltip(false) // 如果已经打开，则关闭
    } else {
        controlTooltip(true) // 如果没有打开，则打开
    }
}

const keyEvent = (e) => {
    switch (e.key) {
        case 'Enter':
            if(isOpen.value) {
                const item = filterOptions.value[inputItem.hightLightIndex] // 获取高亮选项
                if (item) {
                    selectItem(item) // 选择选项
                }
            } else {
                controlTooltip(true) // 打开Tooltip
            }
            break;
        case 'Escape':
            controlTooltip(false) // 关闭Tooltip
            break;
        case 'ArrowDown':
            if (isOpen.value) {
                let index = (inputItem.hightLightIndex + 1) % filterOptions.value.length
                while(filterOptions.value[index].disabled) {
                    index = (index + 1) % filterOptions.value.length // 上一个选项
                }
                inputItem.hightLightIndex = index // 设置高亮选项
            } else {
                controlTooltip(true) // 打开Tooltip
            }
            break;
        case 'ArrowUp':
            if (isOpen.value) {
                let index = (inputItem.hightLightIndex - 1 + filterOptions.value.length) % filterOptions.value.length
                while(filterOptions.value[index].disabled) {
                    index = (index - 1 + filterOptions.value.length) % filterOptions.value.length // 上一个选项
                }
                inputItem.hightLightIndex = index // 设置高亮选项
            } else {
                controlTooltip(true) // 打开Tooltip
            }
            break;
        default:
            break;
    }
}

const selectItem = (item: SelectOption) => {
    if (item.disabled) return // 如果选项被禁用，则不执行
    inputItem.inputValue = item.label // 设置input的值为选项的label
    inputItem.selectedOption = item // 设置选中的选项
    inputRef.value?.ref.focus() // 聚焦input
    emits('update:modelValue', item.value) // 触发 update:modelValue 事件
    emits('change', item.value) // 触发 change 事件
    controlTooltip(false)
}

const clickOutside = () => {
    if (isOpen.value) {
        if (selectedPlaceholder.value) {
            inputItem.inputValue = selectedPlaceholder.value // 如果没有选中，则清空input的值
        }
        controlTooltip(false) // 如果已经打开，则关闭
    }
}

const clearInput = () => {
    inputItem.inputValue = '' // 清空input的值
    inputItem.selectedOption = null // 清空选中的选项
    emits('update:modelValue', '') // 触发 update:modelValue 事件
    emits('change', '') // 触发 change 事件
    emits('clear') // 触发 clear 事件
}

</script>

<style scoped></style>
