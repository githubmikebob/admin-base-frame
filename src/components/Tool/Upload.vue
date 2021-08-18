<template>
  <div>
    <el-upload
        ref="upload"
        class="uploader"
        :disabled="disabled"
        :class="custom_class"
        :accept="upload_type"
        :limit="1"
        :file-list="fileList"
        :headers="header"
        :action="getApiUrl() + upload_url"
        :data="upload_data"
        :list-type="list_type"
        :before-upload="checkFormat"
        :on-change="changeImg"
        :on-preview="preview"
        :on-remove="removeImg"
        :on-exceed="overLimit">
      <i class="el-icon-plus uploader-icon"></i>
    </el-upload>
    <img-preview ref="imgPreview" :top="preview_top"></img-preview>
  </div>
</template>

<script>

import { Upload } from 'element-ui'
import ImgPreview from './ImgPreview'

import { header, getApiUrl, checkCode } from '../../global/js/common/http'
import { checkFormat } from '../../global/js/common/upload'
import requesting from '../../global/js/mixin/requesting'
import deepCopy from '../../global/js/function/deepCopy'

export default {
  name: 'upload',
  mixins: [requesting],
  components: {
    [Upload.name]: Upload,
    ImgPreview
  },
  props: {
    url: { type: String, default: '' }, // 上传地址
    del_url: { type: String, default: '' }, // 删除地址
    list_type: { type: String, default: 'picture-card' },
    file: { type: String, default: '', required: true }, // 图片地址
    upload_data: {
      type: Object, default: () => {
        return {}
      }
    }, // 上传时附带的额外参数
    upload_type: { type: String, default: '.jpeg,.jpg,.png' }, // 接受上传的文件类型（thumbnail-mode 模式下此参数无效
    preview_size: { type: Number, default: 500 }, // 图片放大预览大小
    preview_top: { type: String, default: '10vh' }, // 图片放大预览大小
    disabled: { type: Boolean, default: false }, // 仅显示，不可修改
    custom: { type: String, default: '' }, // 自定义样式
    // tip: { type: String, default: '上传图片' }, // 提示说明文字
  },
  computed: {
    upload_url() { // 上传图片地址
      let url = this.url
      if (!url) return '/Image/Upload'
      else return url
    },
    remove_url() {
      let url = this.del_url
      if (!url) return '/Image/Remove'
      else return url
    },
    custom_class() {
      if (this.img_hidden) return this.custom + ' hidden'
      else return this.custom
    }
  },
  data() {
    return {
      header: header,
      img_hidden: false,
      fileList: [],
      preview_url: '', // 图片预览地址
    }
  },
  methods: {
    getApiUrl,
    checkFormat(file) {
      let that = this
      return checkFormat(that, file)
    },
    init() {
      if (this.file) { // 一开始有图片，则图片必定来至 HTTP
        this.fileList.push(this.file)
        this.preview_url = deepCopy(this.file)
      }
      this.judgeImgHidden(false)
    },
    judgeImgHidden(bool) { // 判断是否隐藏上传窗口
      setTimeout(() => { // 延迟判断，避免数据未更新
        this.img_hidden = (bool || this.file !== '')
      }, 100)
    },
    preview() { // 图片预览
      this.$emit('preview')
      this.$refs.imgPreview.openDialog(this.preview_url, this.preview_size)
    },
    changeImg(file) { // 上传图片
      this.img_hidden = true // 先隐藏，后显示
      switch (file.status) {
        case 'ready':
          if (!checkFormat(this, file)) this.judgeImgHidden(false)
          else this.judgeImgHidden(true)
          break
        case 'success':
          if (checkCode(file.response.code)) {
            this.$emit('update:file', deepCopy(file.response.data.file))
            this.preview_url = deepCopy(file.response.data.url)
            this.judgeImgHidden(false)
          } else {
            this.$message.message(file.response.message)
            this.fileList = []
            this.$emit('update:file', '')
            this.preview_url = ''
            this.judgeImgHidden(false)
          }
          break
        case 'fail':
          this.$message.message('error.add')
          this.fileList = this.$deepCopy(this.file)
          this.judgeImgHidden(false)
          break
      }
    },
    removeImg() { // 删除图片，不进行状态判断，避免页面交互问题
      this.fileList = []
      this.$emit('update:file', '')
      this.preview_url = ''
      this.judgeImgHidden(false)
    },
    overLimit() {
      return this.$message.message(this.$t('upload.error.limit'))
    },
    clear() {
      this.img_hidden = false
      this.fileList = []
      this.preview_url = ''
      this.$emit('update:file', '')
    }
  }
}
</script>

<style lang="scss">

  .hidden .el-upload--picture-card {
    display: none;
  }

  .uploader .el-upload--picture-card {
    /*width: 148px;*/
    /*height: 148px;*/
  }

  .uploader .el-upload-list--picture-card .el-upload-list__item {
    /*width: 148px;*/
    /*height: 148px;*/
  }

  .uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    /*width: 148px;*/
    /*height: 148px;*/
    /*line-height: 148px;*/
  }
</style>