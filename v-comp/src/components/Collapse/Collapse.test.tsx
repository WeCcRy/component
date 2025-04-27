import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Collapse from './Collapse.vue';
import Item from './CollapseItem/CollapseItem.vue';

describe('Collapse 组件测试', () => {
  // 测试基本渲染
  test('正确渲染折叠面板及其子项', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['item1'],
      },
      slots: {
        default: () => (
          <>
            <Item name="item1" title="标题1">内容1</Item>
            <Item name="item2" title="标题2">内容2</Item>
          </>
        ),
      },
      global: {
        stubs: ['Icon'] // 存根 Icon 组件，简化测试
      }
    });

    // 验证组件结构
    expect(wrapper.find('.wy-collapse').exists()).toBe(true);
    const items = wrapper.findAllComponents(Item);
    expect(items.length).toBe(2);
    
    // 检查初始状态
    expect(items[0].props('name')).toBe('item1');
    expect(items[1].props('name')).toBe('item2');
  });

  // 测试折叠面板项的展开/收起状态
  test('根据 modelValue 正确设置活动项', async () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['item1'],
      },
      slots: {
        default: () => (
          <>
            <Item name="item1" title="标题1">内容1</Item>
            <Item name="item2" title="标题2">内容2</Item>
          </>
        ),
      },
      global:{
        stubs: ['Icon'] // 存根 Icon 组件，简化测试
      }
    });

    // 检查初始状态
    let items = wrapper.findAllComponents(Item);
    
    // 等待组件更新
    // await wrapper.vm.$nextTick();
    
    // 获取每个折叠项的内容区域（如果你的组件提供了这种方式）
    const item1Content = items[0].find('.wy-collapse-item__content');
    const item2Content = items[1].find('.wy-collapse-item__content');
    
    // 验证初始状态 - 这需要根据你的实际组件实现调整
    expect(item1Content.exists() && !item1Content.isVisible()).toBe(false);
    expect(item2Content.exists() && !item2Content.isVisible()).toBe(true);
  });

  // 测试点击事件
  test('点击折叠面板项正确触发事件', async () => {
    const onChange = vi.fn();
    const wrapper = mount(Collapse, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (val) => wrapper.setProps({ modelValue: val }),
        onChange,
      },
      slots: {
        default: () => (
          <>
            <Item name="item1" title="标题1">内容1</Item>
            <Item name="item2" title="标题2">内容2</Item>
          </>
        ),
      },
      global:{
        stubs: ['Icon'] // 存根 Icon 组件，简化测试
      }
    });

    // 找到所有折叠面板项的标题部分
    const items = wrapper.findAllComponents(Item);
    const headers = items.map(item => item.find('.wy-collapse-item__header'));
    
    // 点击第一个标题
    await headers[0].trigger('click');
    
    // 验证事件触发和参数
    expect(onChange).toHaveBeenCalledWith(['item1']);
    
    // 验证组件状态已更新
    expect(wrapper.props('modelValue')).toEqual(['item1']);
  });

  // 测试手风琴模式
  test('手风琴模式下只允许一个活动项', async () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['item1','item2'],
        accordion: true,
        'onUpdate:modelValue': (val) => wrapper.setProps({ modelValue: val }),
      },
      slots: {
        default: () => (
          <>
            <Item name="item1" title="标题1">内容1</Item>
            <Item name="item2" title="标题2">内容2</Item>
            <Item name="item3" title="标题3">内容3</Item>
          </>
        ),
      },
      global:{
        stubs: ['Icon'] // 存根 Icon 组件，简化测试
      }
    });

    // 找到所有折叠面板项的标题
    const items = wrapper.findAllComponents(Item);
    const headers = items.map(item => item.find('.wy-collapse-item__header'));
    
    // 点击第二个标题
    await headers[1].trigger('click');
    
    // 验证只有第二项是活动的
    expect(wrapper.props('modelValue')).toEqual(['item2']);
    
    // 点击第三个标题
    await headers[2].trigger('click');
    
    // 验证只有第三项是活动的
    expect(wrapper.props('modelValue')).toEqual(['item3']);
    
    // 点击已激活的项应该关闭它
    await headers[2].trigger('click');
    expect(wrapper.props('modelValue')).toEqual(['']);
  });
});