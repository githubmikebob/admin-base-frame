<template>
  <el-dialog title="" class="preview" :visible.sync="dialog" :width="(parseInt(width) + 10) + 'px'" :top="top" append-to-body :show-close="false">
    <img :width="width" :src="imgUrl" alt="">
  </el-dialog>
</template>

<style>
  .preview {
  }

  .preview .el-dialog__header {
    padding: 0;
    border: none;
  }

  .preview .el-dialog__body {
    padding: 5px;
  }
</style>

<script>
export default {
  name: 'imgPreview',
  props: {
    top: { type: String, default: '10vh' }
  },
  data() {
    return {
      dialog: false,
      imgUrl: '',
      width: ''
    }
  },
  methods: {
    openDialog(url, width = '100%') {
      this.imgUrl = url
      this.width = width
      this.dialog = true
    }
  }
}
</script>
