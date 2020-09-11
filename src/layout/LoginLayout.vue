<template>
  <div :class="key === '/Login' || key === '/Register' ? 'loginBg' : 'forgetBg'">
    <div class="return-login" v-if="key !== '/Login'">
      <el-button icon="el-icon-arrow-left" circle class="return-icon" @click="toLogin"></el-button>
      <span>{{$transform('button.back button.login')}}</span>
    </div>
    <div class="welcome">Hello, Welcome back!</div>
    <div class="logo">
      <el-image v-if="host === 'wj.kgjsoft.com'" :src="wj_logo"></el-image>
      <el-image v-else :src="default_logo"></el-image>
    </div>
    <div class="form-box">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </div>
    <login-footer class="footer"></login-footer>
  </div>
</template>

<script>

import { Image } from 'element-ui'
import { LoginFooter } from './components'

export default {
  name: 'loginLayout',
  components: {
    [Image.name]: Image,
    LoginFooter
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  data() {
    return {
      host: document.domain,
      default_logo: require('../assets/img/login_logo.png'),
      wj_logo: require('../assets/img/logo_title.png')
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin imgBg {
    background-size: cover;
    position: absolute;
    width: 100vw;
    top: 0;
  }

  @mixin common {
    .return-login {
      float: left;
      text-align: left;
      margin: 30px 0 0 40px;

      .return-icon {
        background: rgba(0, 0, 0, 0.4);
        border: none;
        font-size: 18px;
        color: #fff;
        font-weight: 600;
        margin-right: 10px;
      }

      span {
        color: #fff;
        font-size: 18px;
        line-height: 18px;
      }
    }

    .welcome {
      position: absolute;
      left: 50%;
      font: normal 400 50px/50px PingFang SC;
      color: #eee;
      margin: 5% 0 1% -252px;
      text-shadow: 1px 1px #777;
    }

    .logo {
      position: absolute;
      left: 50%;
      width: 282px;
      height: 40px;
      margin: 10% 0 1% -141px;
    }

    .form-box {
      position: absolute;
      top: 40vh;
      left: 50vw;
      margin: -92px 0 0 -200px;
    }

    .footer {
      position: fixed;
      bottom: 7vh;
    }
  }

  .loginBg {
    background: url(../assets/img/loginBg.jpg) no-repeat center;
    height: 40vh;
    @include imgBg;
    @include common;
  }

  .forgetBg {
    background: url(../assets/img/forget_bg.png) no-repeat center;
    height: 24vh;
    @include imgBg;
    @include common;

    .welcome {
      margin-top: 3%;
    }

    .logo {
      margin-top: 8%
    }
  }
</style>
