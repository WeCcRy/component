<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import {ref,onMounted} from 'vue'
import type {ButtonInstance} from './components/Button/types'

const buttonRef = ref<ButtonInstance|null>(null)
onMounted(() => {
  if(buttonRef.value) {
    console.log(buttonRef.value) // 这里可以访问到 Button 组件的Proxy实例
    console.log(buttonRef.value.ref) // 这里可以访问到 Button 组件内部的 button 元素
  }
})
</script>

<template>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain >Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>WY</Button>
    <Button disabled>Disabled Button</Button><br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br/><br/>
</template>

<style scoped>

</style>
