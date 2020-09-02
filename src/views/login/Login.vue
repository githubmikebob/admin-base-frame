<template>
  <div>
    <el-card class="box-card login-card" id="login_card">
      <div>
        <el-form :model="form" :rules="rule" class="form" label-width="0px" ref="form">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" :disabled="requesting" autofocus
                      @keyup.enter.native="login()"
                      :placeholder="$transform('login.placeholder.account')" class="login-input" maxlength="11">
              <i class="el-input__icon el-icon-user" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" :disabled="requesting" @keyup.enter.native="login()"
                      :placeholder="$transform('login.placeholder.password')" class="login-input" type="password"
                      show-password>
              <i class="el-input__icon fas fa-unlock-alt" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-row class="auto-logon">
            <el-col :span="18">
              <el-form-item prop="remember">
                <el-checkbox v-model="form.remember" :disabled="requesting" :true-label="1" :false-label="2"
                             class="remember">{{$transform('login.placeholder.remember')}}
                </el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="text" @click="forget" class="forget">{{$transform('button.forget')}}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <alert ref="Alert" :mark="url" class="alert"/>
        <el-button :loading="requesting" @click="login()" class="login-button" type="primary"
                   size="default">
          <span class="login-text">{{ requesting ? $transform('button.logging') : $transform('button.login') }}</span>
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card, Checkbox } from 'element-ui'
import requesting from '../../global/js/mixin/requesting'

export default {
  name: 'login',
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
  },
  mixins: [requesting],
  created() {
    this.$store.dispatch('user/autoLogin')
    // this.rule = this.$verify('login', this.$deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      url: '/Employee/Login',
      auto_url: '/Employee/AutoLogin',
      form: {
        mobile: '',
        password: '',
        driver_code: '',
        remember: 2,
        type: 1
      },
      rule: {}
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('user/login', this.form)
    },
    register() {
      this.$router.push({ name: 'Register' })
    },
    forget() {
      this.$router.push({ name: 'Forget' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    border-style: none;
    border-radius: 2%;
  }

  .login-card {
    position: relative;
    width: 400px;
    background: rgba(255, 255, 255, 0.2);

    .form {
      text-align: left;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 40px;
      height: 100%;

      .auto-logon {
        margin: -5px 0 -5px;
      }

      .remember {
        margin-top: -5px;
        color: #999;
      }

      .forget {
        margin-top: -5px;
        color: #e6a23c;
        font-size: 14px;
      }
    }

    .alert {
      left: 36px;
      bottom: 10px;
      width: 80%;
    }

    .el-input__prefix {
      left: 10px;
    }

    .login-button {
      width: 80%;
      margin-top: 10px;
      margin-bottom: 20px;

      .login-text {
        letter-spacing: 3px;
        font-size: 14px;
      }
    }

    .register-button {
      margin: 20px 0 10px;
      width: 80%;

      .register-text {
        letter-spacing: 3px;
        color: #999;
        font-size: 14px;
      }
    }
  }
</style>
