<template>
  <div class="login">
    <div class="logo"></div>
    <el-card class="box-card login-card" id="login_card">
      <div class="user-login">{{transform('login.user_login')}}</div>
      <el-form :model="form" :rules="rule" class="form" label-width="0px" ref="form">
        <el-form-item prop="username">
          <el-input v-model="form.username" :disabled="requesting" autofocus :placeholder="transform('login.placeholder.account')" class="login-input" @keyup.enter.native="login(vm, 'form', form, url, vm.language)">
            <i class="el-input__icon el-icon-user" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" :disabled="requesting" :placeholder="transform('login.placeholder.password')" class="login-input" type="password" @keyup.enter.native="login(vm, 'form', form, url, vm.language)">
            <i class="el-input__icon fas fa-unlock-alt" slot="prefix"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <alert ref="Alert" :mark="url" class="alert"/>
      <el-button :loading="requesting" @click="login(vm, 'form', form, url, vm.language)" class="login-button" type="primary" size="default">
        <span class="login-text">{{ requesting ? transform('button.logging') : transform('button.login') }}</span>
      </el-button>
    </el-card>
    <p class="support">{{$t('app.technical_support')}}</p>
  </div>
</template>

<style lang="scss" scoped src="./login.scss"></style>

<script>
import { Card, Checkbox, Button, Form, FormItem } from 'element-ui'
import requesting from '../../global/js/mixin/requesting'
import alert from '../../components/tool/alert'
import { login } from './login'
import verify from '../../global/js/common/verify'
import deepCopy from '../../global/js/function/deepCopy'

export default {
  name: 'login',
  created() {
    this.rule = verify('user', deepCopy(this.form))
  },
  mixins: [requesting],
  components: {
    alert,
    [Card.name]: Card,
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      vm: this,
      url: '/User/Login',
      form: {
        username: '',
        password: ''
      },
      rule: {}
    }
  },
  methods: {
    login
  }
}
</script>
