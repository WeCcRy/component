<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from './components/Button/types'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem/CollapseItem.vue'
import type { NameType } from './components/Collapse/types'
import Icon from './components/Icon/Icon.vue'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value) // 这里可以访问到 Button 组件的Proxy实例
    console.log(buttonRef.value.ref) // 这里可以访问到 Button 组件内部的 button 元素
  }
})

const openedVal = ref<NameType[]>(['item1', 'item2'])
</script>

<template>
<Icon icon="arrow-up" size="2xl" type="success" spin color = 'black'/>
  <Button ref="buttonRef">Test Button</Button>
  <Button plain>Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>WY</Button>
  <Button disabled>Disabled Button</Button><br /><br />
  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="info">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button><br /><br />
  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button><br /><br />
  <Button size="large">Large</Button>
  <Button size="small">Small</Button><br /><br />

  <Collapse v-model=openedVal>
    <Item title="Item1" name="item1">
      <!-- 具名插槽-item -->
      <div>  {{openedVal}}</div>
    </Item>
    <br />

    <Item title="Item2" name="item2">
      <div>  {{openedVal}}</div>
    </Item>
    <br />

    <Item title="Item 3" name="item3" disabled>
      <div>Content for Item 3</div>
    </Item>
  </Collapse>
</template>

<style scoped></style>
