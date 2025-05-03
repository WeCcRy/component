<script setup lang="ts">
import { ref, onMounted,h } from 'vue'
import Button from '@/components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { NameType } from './components/Collapse/types'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'


const buttonRef = ref<ButtonInstance | null>(null)
const tiggerType = ref<any>('hover') // hover click
const tooltipRef = ref<TooltipInstance | null>(null)
const tooltipVisible = ref(false)
const options = [
  { label:h('b','item1'),
    key: "1",
    disabled: false,
    divided: false,
  },
  { label:"item2",
    key: "item2",
    disabled: false,
    divided: true,
  },
  { label:"item3",
    key: "item3",
    disabled: true,
    divided: false,
  }
]

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value) // 这里可以访问到 Button 组件的Proxy实例
    console.log(buttonRef.value.ref) // 这里可以访问到 Button 组件内部的 button 元素
  }
})

const visableChange = (visable: boolean) => {
  console.log('visableChange', visable)
  tooltipVisible.value = visable
}

const changeTrigger = (val: any) => {
  tiggerType.value = val
  if (val === 'manaul') {
    tooltipVisible.value = !tooltipVisible.value
    tooltipVisible.value ? tooltipRef.value?.open() : tooltipRef.value?.close()
  }
}
const dropdownSelect = (item: any) => {
  console.log('dropdownSelect', item)
}

const openedVal = ref<NameType[]>(['item1', 'item2'])
</script>

<template>
  <header style="display: flex;">
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
      <Button size="small" @click="changeTrigger('hover')">hover</Button>
      <Button size="small" @click="changeTrigger('click')">click</Button>
      <Button size="small" @click="changeTrigger('manaul')">manaul</Button>
    </div>
    <Dropdown placement="right" :trigger="tiggerType" ref="tooltipRef" @visable-change="visableChange" @select="dropdownSelect" :open-delay="200"
      :close-delay="200" :menu-options="options">
      <img alt="vue logo" src="./assets/logo.svg " width="100px" height="100px" />
    </Dropdown>
  </header>
  <Icon icon="arrow-up" size="2xl" type="success" spin color='black' />
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
  <Button loading>Loading</Button>
  <Button icon="arrow-right">Icon</Button>

  <Collapse v-model=openedVal>
    <Item title="Item1" name="item1">
      <!-- 具名插槽-item -->
      <div> {{ openedVal }}</div>
    </Item>
    <br />

    <Item title="Item2" name="item2">
      <div> {{ openedVal }}</div>
    </Item>
    <br />

    <Item title="Item 3" name="item3" disabled>
      <div>Content for Item 3</div>
    </Item>
  </Collapse>

  <div>
    <Alert type="primary" content="primary" closeable></Alert>
    <Alert type="success" closeable>success</Alert>
    <Alert type="info" effect="dark" closeable>info-dark</Alert>
    <Alert type="warning" effect="dark" closeable>warning-dark</Alert>
    <Alert type="danger">
      <div>danger</div>
      <div>It is not closeable</div>
    </Alert>
  </div>
</template>

<style scoped></style>
