import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Input from './Input.vue'

describe('Input 组件测试', () => {
  //   测试基本渲染
  test('正确渲染输入框', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '初始值',
        size: 'small',
        type: 'text',
      },
      slots: {
        prepend: 'prepend',
        append: 'append',
        prefix: 'prefix',
        suffix: 'suffix',
      },
    })
    console.log(wrapper.html())
    // 验证组件结构和样式
    expect(wrapper.find('.wy-input').exists()).toBe(true)
    expect(wrapper.classes()).toContain('wy-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    expect(wrapper.classes()).toContain('is-prefix')
    // 验证输入框
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // 验证slots
    expect(wrapper.find('.wy-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.wy-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.wy-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.wy-input__prefix').text()).toBe('prefix')

    // 验证textarea
    const wrapper2 = mount(Input, {
      props: {
        modelValue: '初始值',
        type: 'textarea',
      },
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })
  // 测试v-model
  test('正确处理 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '初始值',
        type: 'text',
        'onupdate:modelValue': (e: any) => {
          wrapper.setProps({ modelValue: e })
        },
      },
    })
    const input = wrapper.get('input')
    // 验证初始值
    expect(input.element.value).toBe('初始值')
    // 内部修改
    await input.setValue('新值')
    expect(input.element.value).toBe('新值')
    // 修改值并验证
    await wrapper.setProps({ modelValue: '外部新值' })
    expect(input.element.value).toBe('外部新值')
  })

  // 关闭功能测试
  test('点击关闭图标时清空输入框', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text',
      },
      global:{
        stubs: ['Icon'] // 存根 Icon 组件，简化测试

      }
    })
    // 验证初始状态，删除图标是否存在
    expect(wrapper.find('.wy-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    console.log(wrapper.html())
    // 验证删除图标是否存在
    expect(wrapper.find('.wy-input__clear').exists()).toBeTruthy()
    // 点击清除图标
    const clearIcon = wrapper.get('.wy-input__clear')
    await clearIcon.trigger('click')
    // 验证输入框被清空
    expect(input.element.value).toBe('')
  })

  // 显示/隐藏密码测试
    test('点击显示/隐藏密码图标时切换密码可见性', async () => {
        const wrapper = mount(Input, {
        props: {
            modelValue: '',
            showPassword: true,
            type: 'text',
        },
        global:{
            stubs: ['Icon'] // 存根 Icon 组件，简化测试
    
        }
        })
        const input = wrapper.get('input')
        // 验证初始状态
        expect(input.element.type).toBe('password')
        // 此时图标不应该存在,因为密码为空
        expect(wrapper.find('.wy-input__password').exists()).toBeFalsy()
        // 设置内容，使得图标存在
        await wrapper.setProps({ modelValue: '123456' })
        console.log(wrapper.html())

        const passwordIcon = wrapper.find('.wy-input__password')
        // 验证密码图标存在
        expect(passwordIcon.exists()).toBeTruthy()
        // 验证密码图标属性
        expect(passwordIcon.attributes('icon')).toBe('eye-slash')

        // 验证类型切换
        await passwordIcon.trigger('click')
        console.log(wrapper.html())
        // 验证输入框类型切换为text
        expect(input.element.type).toBe('text')
        // 验证密码图标属性
        expect(passwordIcon.attributes('icon')).toBe('eye')
    })
})
