export default {
  computed: {
    requesting() {
      let requesting = this.$store.state.app.requesting
      return requesting.status
    }
  }
}
