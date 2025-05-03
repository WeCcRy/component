import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';
import { nextTick } from 'vue';

// 使用 vitest 的模拟功能来模拟 Popper.js
vi.mock('@popperjs/core')

describe('Tooltip 组件测试', () => {

    // 在每个测试之前使用虚拟定时器
    // 使用vi.useFakeTimers()来推进所有的计时器
    beforeEach(() => {
        vi.useFakeTimers();
    });

    // 测试基本渲染
    test('正确渲染 Tooltip 组件', () => {
        const wrapper = mount(Tooltip, {
            props: {
                content: '提示文本',
                openDelay:200,
                closeDelay:200,
            },
            slots: {
                default: '<button>触发元素</button>'
            },
        });

        // 验证组件结构
        expect(wrapper.find('.wy-tooltip').exists()).toBe(true);
        expect(wrapper.find('.wy-tooltip__trigger').exists()).toBe(true);
        // 默认情况下，提示框不可见
        expect(wrapper.find('.wy-tooltip__popper').exists()).toBe(false);
    });

    // 测试 hover 触发显示
    test('鼠标悬停时显示 Tooltip', async () => {
        const wrapper = mount(Tooltip, {
            props: {
                content: '提示文本',
                trigger: 'hover',
                openDelay:200,
                closeDelay:200,
            },
            slots: {
                default: '<div>触发元素</div>'
            }
        });

        // 触发鼠标悬停
        await wrapper.find('.wy-tooltip').trigger('mouseenter');
        vi.runAllTimers(); // 推进所有计时器

        await nextTick();
        console.log(wrapper.html())
        expect(wrapper.find('.wy-tooltip__popper').exists()).toBe(true);
    });

    // 测试 hover 触发隐藏
    test('鼠标移开时隐藏 Tooltip', async () => {
        const wrapper = mount(Tooltip, {
            props: {
                content: '提示文本',
                trigger: 'hover',
                openDelay:200,
                closeDelay:200,
            },
            slots: {
                default: '<div>触发元素</div>'
            }
        });

        // 先显示 Tooltip
        await wrapper.find('.wy-tooltip').trigger('mouseenter');
        vi.runAllTimers(); // 推进所有计时器
        await nextTick();
        expect(wrapper.find('.wy-tooltip__popper').exists()).toBe(true);

        // 触发鼠标移开
        await wrapper.find('.wy-tooltip').trigger('mouseleave');
        vi.runAllTimers(); // 推进所有计时器
        await nextTick();

        // 验证提示框隐藏
        expect(wrapper.find('.wy-tooltip__popper').exists()).toBe(false);
    });

    // 测试通过 open/close 方法控制显示隐藏
    test('通过方法控制 Tooltip 显示隐藏', async () => {
        const wrapper = mount(Tooltip, {
            props: {
                content: '提示文本',
                manaul: true,
                openDelay:200,
                closeDelay:200,
            },
            slots: {
                default: '<div>触发元素</div>'            }
        });

        // 使用 open 方法显示
        wrapper.vm.open();
        vi.runAllTimers(); // 推进所有计时器
        await nextTick();

        // 验证提示框可见
        expect(wrapper.find('.wy-tooltip__popper').exists()).toBe(true);

        // 使用 close 方法隐藏
        wrapper.vm.close();
        vi.runAllTimers(); // 推进所有计时器
        await nextTick();

        // 验证提示框隐藏
        expect(wrapper.find('.wy-tooltip__popper').exists()).toBe(false);
    });
});