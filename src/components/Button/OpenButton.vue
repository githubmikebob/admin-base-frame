<template>
  <div class="open-button">
    <el-button :size="global_size" :type="type" @click="open" class="open-button" plain v-if="checkRule(rules)">
      <i :class="icon" class="open-icon"/>{{$transform(name)}}
    </el-button>
    <template v-if="showDialog">
      <el-dialog
        modal-append-to-body
        :width="dWidth"
        :visible.sync="visible"
        :close-on-click-modal="false"
      >
        <template slot="title" v-if="dTitle">
          <h1>{{ dTitle }}</h1>
        </template>
        <slot/>
      </el-dialog>
    </template>
    <slot name="open-main" v-else></slot>
  </div>
</template>

<script>
import { checkRule } from '../../global/js/table/table'
import global_size from '../../global/js/mixin/global_size'

export default {
  name: 'OpenButton',
  mixins: [global_size],
  components: {},
  props: {
    rules: {
      type: Array, default() {
        return []
      }
    },
    name: { type: String, default: 'button.new' },
    type: { type: String, default: 'default' },
    icon: { type: String, default: 'fas fa-plus' },
    showDialog: { type: Boolean, default: () => true },
    dWidth: { type: String, default: '50%' },
    dTitle: { type: String, default: '' }
  },
  computed: {},
  watch: {},
  data() {
    return {
      visible: false
    }
  },
  methods: {
    checkRule,
    open() {
      this.showDialog ? this.visible = true : this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
  .open-button {
    margin-right: 5px;

    .open-icon {
      padding-right: 3px;
      color: #2EBAAE;
    }
  }
</style>
