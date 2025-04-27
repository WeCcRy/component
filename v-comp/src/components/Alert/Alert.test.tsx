import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Alert from './Alert.vue';
import Icon from '../Icon/Icon.vue';

describe('Alert 组件测试', () => {
  // 测试基本渲染
  test('正确渲染Alert组件及其内容', () => {
    const content = '这是一条警告信息';
    const wrapper = mount(Alert, {
      props: {
        content,
        type: 'warning',
        effect: 'light',
        closeable: true
      },
      global: {
        stubs: ['Icon']
      },
    });

    // 检查组件是否存在
    expect(wrapper.find('.wy-alert').exists()).toBe(true);
    const element = wrapper.find('.wy-alert');
    // 检查内容是否正确
    expect(wrapper.text()).toContain(content);
    // 检查类名是否正确
    expect(element.classes()).toContain('wy-alert--warning');
    expect(element.classes()).toContain('is-closeable');
    expect(element.classes()).not.toContain('is-dark');
  });

  // 测试不同类型
  test('根据type属性正确应用样式类', () => {
    const types = ['primary','success', 'warning', 'info', 'error'];
    
    types.forEach(type => {
      const wrapper = mount(Alert, {
        props: { 
          content: 'Test Alert',
          type:type as any,
        },
        global: {
          stubs: {
            Icon: true,
            Transition: true
          }
        }
      });
      
      expect(wrapper.find('.wy-alert').classes()).toContain(`wy-alert--${type}`);
    });
  });

  // 测试暗色主题
  test('当effect为dark时应用暗色样式', () => {
    const wrapper = mount(Alert, {
      props: {
        content: 'Dark Alert',
        effect: 'dark'
      },
      global: {
        stubs: {
          Icon: true,
          Transition: true
        }
      }
    });
    
    expect(wrapper.find('.wy-alert').classes()).toContain('is-dark');
  });

  // 测试插槽内容
  test('正确渲染默认插槽内容', () => {
    const slotContent = '<strong>自定义内容</strong>';
    const wrapper = mount(Alert, {
      props: {
        content: 'Alert with slot'
      },
      slots: {
        default: slotContent
      },
      global: {
        stubs: {
          Icon: true,
          Transition: true
        }
      }
    });
    
    expect(wrapper.find('.wy-alert').html()).toContain(slotContent);
  });

  // 测试关闭功能
  test('点击关闭图标时隐藏Alert', async () => {
    const wrapper = mount(Alert, {
      props: {
        content: 'Closeable Alert',
        closeable: true
      },
      global: {
        stubs: ['Icon']
      }
    });
    
    // 确认初始状态是显示的
    expect(wrapper.isVisible()).toBe(true);
    
    // 找到关闭图标并点击
    const closeIcon = wrapper.findComponent(Icon);
    await closeIcon.trigger('click');
    wrapper.vm.$nextTick(); // 等待DOM更新
    console.log(wrapper.find('.wy-alert').html())
    // 验证组件被隐藏
    expect(wrapper.find('.wy-alert').isVisible()).toBeFalsy;
  });

  // 测试不可关闭的情况
  test('当closeable为false时不显示关闭图标', () => {
    const wrapper = mount(Alert, {
      props: {
        content: 'Non-closeable Alert',
        closeable: false
      },
      global: {
        stubs: ['Icon']
      }
    });
    
    // 验证没有关闭图标
    const closeIcon = wrapper.findComponent(Icon);
    expect(closeIcon.isVisible()).toBeFalsy();
  });
});