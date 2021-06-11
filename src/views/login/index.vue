<template>
  <div>{{ }}</div>
</template>

<script>
import { ref, watch, reactive, watchEffect } from 'vue'

export default {
  props: {
    details: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const obj = reactive({ a: 1, b: 2 })

    watchEffect(() => {
      console.log(obj)
    }
    )

    setInterval(() => {
      obj.a++
    }, 1000)

    // 暴露给 template
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
