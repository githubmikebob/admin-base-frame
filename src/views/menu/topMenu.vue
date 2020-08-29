<template>
  <normal-select
      ref="normalSelect"
      :select_id.sync="id"
      :disabled="requesting"
  >
    <template slot="option" scope="scope">
      <span>{{ scope.scope.name}}</span>
    </template>
  </normal-select>
</template>

<script>

import storage from '../../global/js/common/storage'
import requesting from '../../global/js/mixin/requesting'

import deepCopy from '../../global/js/function/deepCopy'
import { apiPost, checkCode } from '../../global/js/common/http'

export default {
  name: 'topMenu',
  mixins: [requesting],
  components: {
    NormalSelect: () => import('../../components/selection/NormalSelect')
  },
  props: {
    select_id: { required: true, type: Number },
  },
  data() {
    return {
      id: 0,
      url: '/Menu/Tops'
    }
  },
  methods: {
    getTops() {
      this.id = deepCopy(this.select_id)
      let tops = storage.get('top_menu')
      if (tops) {
        this.$refs.normalSelect.pool = tops
        this.$refs.normalSelect.init()
      } else {
        let that = this
        apiPost(that.url).then(({ code, data }) => {
          if (checkCode(code)) {
            storage.set('top_menu', data, 3600)
            that.$refs.normalSelect.pool = data
            that.$refs.normalSelect.init()
          }
        })
      }
    }
  },
  watch: {
    id(val) {
      this.$emit('update:select_id', val)
    }
  }
}
</script>

<style scoped>

</style>