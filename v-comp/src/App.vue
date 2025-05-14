<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue'
import Button from '@/components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Input from './components/Input/Input.vue'
import Switch from './components/Switch/Switch.vue'
import Select from './components/Select/Select.vue'
import Form from './components/Form/Form.vue'
import FormItem from './components/Form/FormItem/FormItem.vue'
// import Message from './components/Message/Message.vue'
import type { NameType } from './components/Collapse/types'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'
import type { FormInstance } from './components/Form/types'
import { createMessage } from './components/Message/method.ts'
import type { SelectOption } from './components/Select/types'
import getProvinces from '@/components/Select/remoteTest'


const buttonRef = ref<ButtonInstance | null>(null)
const tiggerType = ref<any>('hover') // hover click
const tooltipRef = ref<TooltipInstance | null>(null)
const tooltipVisible = ref(false)
const inputVal = ref('')
const switchVal = ref('correct')
const selectVal = ref('1')
const remoteVal = ref('')

const formRef = ref<FormInstance | null>(null)
const selectOptions = [
  {
    label: 'Shanghai',
    value: '1',
  },
  {
    label: 'Beijing',
    value: '2',
  },
  {
    label: 'Shenzhen',
    value: '3',
  },
  {
    label: 'Guangzhou',
    value: '4',
    disabled: true,
  },
  {
    label: 'Tianjin',
    value: '5',
    disabled: true,
  },
  {
    label: 'Hangzhou',
    value: '6',
  },
  {
    label: 'Nanjing',
    value: '7',
  },
  {
    label: 'Wuhan',
    value: '8',
    disabled: true,
  },
]
const options = [
  {
    label: h('b', 'item1'),
    key: "1",
    disabled: false,
    divided: false,
  },
  {
    label: "item2",
    key: "item2",
    disabled: false,
    divided: true,
  },
  {
    label: "item3",
    key: "item3",
    disabled: true,
    divided: false,
  }
]

onMounted(() => {
  const instance = createMessage({ message: '两秒后调用手动删除', duration: 0, type: 'success' })
  createMessage({ message: '常驻信息', duration: 0 })
  createMessage({ message: '三秒后自动删除', type: 'danger' })
  setTimeout(() => {
    instance.destroy()
  }, 2000)
})

const visibleChange = (visible: boolean) => {
  console.log('visibleChange', visible)
  tooltipVisible.value = visible
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

const optionRender = (option: SelectOption) => {
  return h('div', { style: 'display:flex;justify-content: space-between;' }, [
    h('div', { style: 'color: blue' }, option.label),
    h('div', { style: 'color: red' }, option.value),
  ])
}

const formModel = reactive({
  email: '',
  password: '',
  comfirmedPassword: '',
})
const formRules = {
  email: [
    { required: true, type: "email", message: '请输入正确的邮箱格式', trigger: '[blur]' },
    { required: true, type: "email", message: '请输入正确的邮箱格式', trigger: '[input]' },

  ],
  password: [
    { required: true, type: "string", message: '请输入密码', trigger: '[blur]' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符之间', trigger: '[input,blur]' },
  ],
  comfirmedPassword: [
    { required: true, type: "string", message: '请再次输入密码', trigger: '[blur]' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符之间', trigger: '[input,blur]' },
    { validator: (rule: any, value: string) => {
        if (value !== formModel.password) {
          return new Error('两次输入的密码不一致')
        }
        return true
      }, trigger: '[blur,input]' },
  ],
}

const submit = async () => {
  try {
    await formRef.value?.validate()
  } catch (e) {
    const error = e as any
    console.log('error', error)
  }
}

const resetField = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <header style="display: flex;">
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
      <Button size="small" @click="changeTrigger('hover')">hover</Button>
      <Button size="small" @click="changeTrigger('click')">click</Button>
      <Button size="small" @click="changeTrigger('manaul')">manaul</Button>
    </div>
    <Dropdown placement="right" :trigger="tiggerType" ref="tooltipRef" @visible-change="visibleChange"
      @select="dropdownSelect" :open-delay="200" :close-delay="200" :menu-options="options">
      <img alt="vue logo" src="./assets/logo.svg " width="100px" height="100px" />
    </Dropdown>
    <Switch v-model="switchVal" active-value="correct" in-active-value="wrong" size="large" active-text="Correct"
      in-active-text="Wrong"></Switch>
    <Select v-model="selectVal" :options="selectOptions" :renderCustom="optionRender" filterable></Select>
    <Select v-model="remoteVal" filterable remote :remoteMethod="getProvinces"></Select>
    <!-- <Message></Message> -->
  </header>
  <div>
    <Form :model="formModel" :rules="formRules" ref="formRef">
      <!-- 使用prop传入校验规则，校验名称为username -->
      <FormItem label="邮箱" prop="email">
        <!-- 语法，获取子组件传出的值 -->
        <template #content>
          <Input v-model="formModel.email" type="text"></Input>
        </template>
      </FormItem>
      <!-- 使用prop传入校验规则，校验名称为password -->
      <FormItem label="密码" prop="password">
        <template #content>
          <Input v-model="formModel.password" type="text" showPassword></Input>
        </template>
      </FormItem>
      <FormItem label="再次输入密码" prop="comfirmedPassword">
        <template #content>
          <Input v-model="formModel.comfirmedPassword" type="text" showPassword></Input>
        </template>
      </FormItem>
      <div>
        <Button type="primary" @click.prevent="submit">提交</Button>
        <Button @click.prevent="resetField">重置</Button>
      </div>
    </Form>
  </div>
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
  <div>
    <Input placeholder="请输入内容" v-model="inputVal" type="text" clearable show-password size="large">
    <template #prepend>
      <Icon icon="arrow-left" />
      <span style="margin-left: 10px;">Prepend</span>
    </template>
    <template #prefix>
      <div>Input</div>
    </template>
    <template #append>
      <span style="margin-right: 10px;">Append</span>
      <Icon icon="arrow-right" />
    </template>
    </Input>
  </div>
</template>

<style scoped></style>
