<template>
  <span class="custom-color" :style="'margin-left: ' + margin_left">
    <i class="fas fa-exclamation-circle success" style="margin-right: 8px" />
    <span class="info" style="font-size: 14px">{{tip}}</span>
  </span>
</template>

<script>
export default {
  name: 'tip',
  props: {
    tip: { type: String, required: true },
    margin_left: { type: String, default: '0' }
  }
}
</script>
