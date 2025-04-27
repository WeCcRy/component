import {describe, expect, test} from 'vitest';
import Button from './Button.vue';
import {mount} from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

describe('Button.vue', () => {
    test('basic button',()=>{
        const wrapper = mount(Button, {
            props: {
                type: 'primary',
                size: 'large',
            },
            slots:{
                default:'button'
            }
        });
        // 检测class
        expect(wrapper.classes()).toContain('wy-button--primary')
        // 检测slots
        expect(wrapper.text()).toContain('button')
        // 检测events
        wrapper.trigger('click')
        expect(wrapper.emitted()).toHaveProperty('click')
    }) 
    test('disabled button',()=>{
        const wrapper = mount(Button, {
            props: {
                disabled: true,
                // isloading: true,
            },
        });
        expect(wrapper.classes()).toContain('is-disabled') // 检测class中是否包含is-disabled
        expect(wrapper.attributes('disabled')).toBeDefined() // 检测disabled属性是否存在
        wrapper.trigger('click')
        expect(wrapper.emitted()).not.toHaveProperty('click') // 检测click事件是否被触发
    })
    test('icon',()=>{
        const wrapper = mount(Button, {
            props: {
                icon: 'arrow-up',
            },
            slots:{
                default:'icon'
            },
            // 使用stubs来模拟组件
            global:{
                stubs:['FontAwesomeIcon'] // 这里的FontAwesomeIcon是一个组件，使用stubs来模拟组件，也可以直接模拟Icon组件
            }
        });
        console.log(wrapper.html())
        const element = wrapper.findComponent(FontAwesomeIcon)
        expect(element.exists()).toBe(true)
        expect(element.attributes('icon')).toBe('arrow-up') // 检测icon属性是否为arrow-up
    })
})