<template>
  <el-alert
    :title="this.$transform(alert.content)"
    :type="alert.type"
    @close="close"
    center
    show-icon
    style="margin-bottom: 0.8vh;"
    v-show="isMark && alert.show"
  />
</template>

<script>
import store from '../../store'
import { mapGetters } from 'vuex'
import { Alert } from 'element-ui'

import { isArray } from '../../global/js/common/data'

export default {
  name: 'Alert',
  components: {
    [Alert.name]: Alert
  },
  computed: {
    ...mapGetters([
      'alert_mark',
      'alert'
    ])
  },
  props: {
    mark: { required: true }
  },
  methods: {
    isMark() {
      if (isArray(this.mark)) return this.mark.indexOf(this.alert_mark)
      else return this.mark === this.alert_mark
    },
    close() {
      store.dispatch('alert/clearAlert')
    }
  }
}
</script>
