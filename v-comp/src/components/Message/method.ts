import { render,h, shallowReactive } from "vue";
import type { CreateMessageProps,MessageContext } from "./types";
import Message from "./Message.vue";
import useZIndex from "@/hooks/useZIndex";

let seed = 1

//当调用 h(Message, newProps) 时，只是创建了 VNode 描述,此时还没有创建实际组件实例,component 属性会在渲染过程中才被填充
//所以需要将messageList 定义为 reactive, 这样在渲染时，Vue 会自动将其转换为响应式对象，当列表变换的时候，会重新执行
const messageList: MessageContext[] = shallowReactive([])

export const createMessage = (props:CreateMessageProps) => {
    const id = `message_${seed++}`
    const { nextIndex } = useZIndex()
    const container = document.createElement('div')
    const destroy = () => {
        const idx = messageList.findIndex(item => item.id === id)
        if (idx !== -1) {
            messageList.splice(idx, 1)
        }
        render(null, container)
    }

    const manaulDestroy = () => {
        const instance = messageList.find(item => item.id === id)
        if (instance) {
            instance.vm.exposed!.visible.value = false
        }
    }

    const newProps = {
        id,
        ...props,
        onDestroy: () => {
            destroy()
        },
        destroy: manaulDestroy,
        zIndex:nextIndex().value
    }

    const vNode = h(Message, newProps)
    render(vNode, container)
    document.body.appendChild(container.firstElementChild!)
    const instance = {
        id,
        message: vNode,
        props: newProps,
        vm: vNode.component!,
        destroy: manaulDestroy
    }

    messageList.push(instance)

    return instance
}

export const getLastInstance = () => {
    return messageList.at(-1)
}

export const getLastOffset = (id:string) => {
    const idx = messageList.findIndex(item => item.id === id)
    if (idx >0) {
        const prev = messageList[idx - 1]
        return prev.vm.exposed!.bottomOffset.value
    }
    return 0
}

export const destoryAllMessage = () => {
  messageList.forEach(message => {
    message.destroy()
  })
}