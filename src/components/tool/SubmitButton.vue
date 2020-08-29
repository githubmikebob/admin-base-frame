<template>
  <div :align="align" slot="footer" style="margin-right: 2vh">
    <el-button :size="size" @click="close" type="default" v-if="!saving">{{$t(cancel)}}</el-button>
    <el-button :size="size" @click="save()" type="primary" v-if="!saving">{{$t(submit)}}</el-button>
    <i class="el-icon-loading color-primary" style="font-size: 25px" v-if="saving"></i>
  </div>
</template>

<script>
export default {
  name: 'submitButton',
  computed: {
    size() {
      return this.$store.state.app.size
    }
  },
  props: {
    align: { type: String, default: 'center' },
    cancel: { type: String, default: 'button.cancel' },
    submit: { type: String, default: 'button.save' },
    saving: { type: Boolean, default: false }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    save() {
      this.$emit('save')
    }
  }
}
</script>
