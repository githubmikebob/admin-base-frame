<template>
  <div class="base-dropdown">
    <el-dropdown trigger="click" size="medium">
      <el-row type="flex" justify="end" align="middle">
        <el-col :span="2"><i :class="dropdown.icon"></i></el-col>
        <el-col :span="8"><span>{{ dropdown.name }}</span></el-col>
        <el-col :span="2"><i class="fas fa-sort-down"></i></el-col>
      </el-row>
      <el-dropdown-menu slot="dropdown" style="width: 120px;">
        <el-dropdown-item v-for="item in menuItem" :key="item.name" @click.native="item.fun">
          <div class="item-group" v-if="item">
            <i :class="item.icon"></i>
            <span>{{ $transform(item.name) }}</span>
          </div>
        </el-dropdown-item>
        <slot name="menu-item"></slot>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type='text/ecmascript-6'>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

export default {
  name: 'BaseDropdown',
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  props: {
    dropdown: { type: Object, require: true },
    menuItem: { type: Array }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .base-dropdown {
    width: 100%;
    height: 100%;

    .el-dropdown {
      width: 100%;
      height: 100%;
      cursor: pointer;

      .el-row {
        width: 100%;
        height: 100%;

        .el-col {
          display: flex;
          align-items: center;
          justify-content: center;

          i, span {
            color: #ccc;
          }
        }

      }
    }
  }

  .item-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>