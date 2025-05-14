import { defineComponent } from 'vue'

const RenderVNode = defineComponent({
  name: 'RenderVNode',
  props: {
    vNode: {
      type: [String, Object,Array],
      required: true,
    },
  },
  setup(props) {
    console.log('RenderVNode', props.vNode)
    return () => props.vNode
  },
})

export default RenderVNode
