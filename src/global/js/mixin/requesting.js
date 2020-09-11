export default {
  computed: {
    requesting() { // 控制loading状态
      let requesting = this.$store.state.app.requesting
      return requesting.status
    }
  }
}
