<template>
  <div class="nav_bar">
    <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" class="hamburger-container" id="hamburger-container"/>
    <breadcrumb class="breadcrumb-container" id="breadcrumb-container"/>
    <div class="right-menu">
      <div style="float: left;">
        <span style="color: #62666e; font-size: 18px">Socket.ID：{{socket.fd}}</span>
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'" alt="" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="cleanCache()">{{ $t('button.clearCache') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{ $t('login.logout') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu, Tooltip } from 'element-ui'
import breadcrumb from '../../components/tool/breadcrumb';
import hamburger from '../../components/tool/hamburger';

import { mapGetters } from 'vuex'
import { apiPost, checkCode } from '../../global/js/common/http'
import { load } from '../../global/js/common/message'
// import { disConnect } from '../../global/js/websocket'
import { loginPage } from '../../views/login/login'

export default {
  name: 'navBar',
  components: {
    breadcrumb,
    hamburger,
    [Tooltip.name]: Tooltip,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'socket'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      let that = this
      let user = this.$storage.get('user')
      let loading = load('login.exiting')
      apiPost('/User/Logout', { username: user.username, fd: this.socket.fd }).then((res) => {
        if (res.code === 200) {
          that.storage.clear()
          that.$store.dispatch('user/logout')
          // disConnect()
          loginPage()
          loading.close()
        }
      })
    },
    cleanCache() {
      apiPost('/System/CleanCache', {}).then(res => {
        if (checkCode(res.code)) this.message.notify(res.message, res.status)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav_bar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
