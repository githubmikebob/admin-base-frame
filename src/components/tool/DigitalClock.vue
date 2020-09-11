<template>
  <div class="digital-clock">
    <i class="icon" :class="icon"/>
    <span class="value">{{ $t(week) }} {{ date }}</span>
  </div>
</template>

<script type='text/ecmascript-6'>
import { formatDate } from '../../global/js/common/time'

export default {
  name: 'DigitalClock',
  components: {},
  props: {
    now: { type: [Date, Number] },
    split: { type: String, default: '-' },
    icon: { type: String, default: 'far fa-calendar-check' }
  },
  data() {
    return {
      week: '',
      date: '',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {
    let timer = setInterval(() => {
      this.init()
    }, 1000)
    // 只监听一次摧毁组件前的生命周期
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  },
  methods: {
    init() {
      let t = this.now || new Date().getTime()
      let d = formatDate(t, this.split)
      this.$nextTick(() => {
        this.week = `base.${d.W}`
        this.date = d.time
      })
    }
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .digital-clock {
    height: 100%;
    display: flex;
    align-items: center;
  .value {
    margin-left: 10px;
  }

  }
</style>