<template>
    <!-- $attrs用于获取props外的属性 -->
    <div class = 'wy-icon' :class="{[`wy-icon--${type}`]:type}" :style="CustomStyle" v-bind="$attrs">
        <FontAwesomeIcon v-bind="filteredProps" />
    </div>
</template>

<script setup lang="ts">
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {omit} from 'lodash-es'
import { computed } from 'vue';

defineOptions({
    name: 'WyIcon',
    inheritAttrs:false, // 接受所有属性
})

const props = defineProps<IconProps>()
// 将type和color过滤出来。为了实时监视props的变化，采用computed
const filteredProps = computed(()=>omit(props, ['type', 'color']))
const CustomStyle = computed(()=>{
    return props.color ? {color:props.color} : {}
})
</script>

<style lang="scss" scoped>

</style>