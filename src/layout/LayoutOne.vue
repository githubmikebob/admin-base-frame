<template>
  <div class="layout-one">
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="2">
            <img src="../assets/img/header_logo.png"/>
          </el-col>
          <el-col :span="20">
            <horizontal-menu></horizontal-menu>
          </el-col>
          <el-col :span="2">
            <app-dropdown></app-dropdown>
          </el-col>
        </el-row>
        <tabs-view/>
      </el-header>
      <el-main>
        <app-main/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { AppMain, TabsView, HorizontalMenu, AppDropdown } from './components'
import { Container, Header, Aside, Main } from 'element-ui'

export default {
  name: 'LayoutOne',
  components: {
    AppMain,
    TabsView,
    HorizontalMenu,
    AppDropdown,
    [Container.name]: Container,
    [Header.name]: Header,
    [Aside.name]: Aside,
    [Main.name]: Main,
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .layout-one {
    .el-main, .el-header {
      height: auto !important;
      padding: 0;

      .el-row {
        height: 54px;
        background-color: #304156;
        color: #fff;

        .el-col {
          height: 100%;
          overflow: hidden;

          &:first-child, &:last-child {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          &:last-child {
            padding: 0 15px 0 0;
          }

        }
      }
    }
  }
</style>
