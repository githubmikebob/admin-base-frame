<template>
  <div class="search-form">
    <normal-form
      inline
      hiddenFooter
      hiddenLabel
      ref="normal-form"
      language="search"
      :form="newForm"
      :hiddenData="hiddenData"
      @sub="success"
    >
      <template slot="form-item">
        <el-button @click="more" v-if="showMore" size="mini" type="text">
          {{ $transform('base.more base.screen') }}<i :class="moreIcon"/>
        </el-button>
      </template>
      <template slot="footer-item">
        <search-button @search="verify"></search-button>
      </template>
    </normal-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'SearchForm',
  components: {
    NormalForm: () => import('./NormalForm'),
    SearchButton: () => import('../Button/SearchButton')
  },
  mixins: [],
  model: {},
  props: {
    form: {
      type: Object, default() {
        return { keyword: null, page: 1, size: 10 }
      }
    },
    hiddenData: {
      type: Array, default() {
        return ['id', 'page', 'size']
      }
    },
    showMoreNum: { type: Number, default: 3 }
  },
  data() {
    return {
      showList: [], // 暂存隐藏时所展示form数据的key
      newForm: {}, // 最终计算得出的form
      isOpen: false // 控制展开与隐藏
    }
  },
  computed: {
    formKey() { // 返回初始所有form的key数组
      let keyList = []
      for (let k in this.form) {
        if (this.form.hasOwnProperty(k)) keyList.push(k)
      }
      return keyList
    },
    showMore() {
      return this.showMoreNum < this.formKey.length
    },
    moreIcon() {
      return this.isOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },
    showForm() { // 隐藏时所展示的form数据
      let obj = {}
      for (let k in this.form) {
        if (this.form.hasOwnProperty(k) && this.showList.indexOf(k) > -1) {
          obj[k] = this.form[k]
        }
      }
      return obj
    }
  },
  watch: {
    showMoreNum: {
      handler: function(nV) {
        this.showList = this.formKey.slice(0, nV)
      },
      immediate: true
    },
    isOpen: { // 监听是否展开来控制form的数据
      handler: function(nV) {
        this.newForm = nV ? this.form : this.showForm
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    verify() {
      this.$refs['normal-form'].verify()
    },
    success(form) {
      this.$emit('sub', form)
    },
    more() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .search-form {

  }
</style>