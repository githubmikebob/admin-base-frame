export default {
  computed: {
    requesting() {
      let requesting = this.$store.state.app.requesting
      // if (requesting.mark === this.url) return requesting.status
      // else return false
      return requesting.status
    }
  }
}
