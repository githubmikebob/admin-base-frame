<template>
  <div class="forget-card">
    <div v-if="modify_psd">
      <div class="modify-psd">{{ $transform('button.modify login.password') }}</div>
      <el-form :model="form" :rules="rule" class="form" label-width="0px" ref="form">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" :disabled="requesting" autofocus :placeholder="this.$transform('login.placeholder.mobile')" class="forget-input">
            <i class="el-input__icon el-icon-user" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" :disabled="requesting" :placeholder="this.$transform('forget.placeholder.code')" class="forget-input" type="text">
            <i class="el-input__icon el-icon-circle-check" slot="prefix"></i>
            <template slot="suffix">
              <span v-show="show_code" @click="getCode(vm)" class="code">{{$transform('button.verification_code')}}</span>
              <span v-show="!show_code" class="code">{{count_code}} s</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" :disabled="requesting" :placeholder="this.$transform('forget.placeholder.password')" class="forget-input" type="password" show-password>
            <i class="el-input__icon fas fa-unlock-alt" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_confirmation">
          <el-input v-model="form.password_confirmation" :disabled="requesting" :placeholder="this.$transform('forget.placeholder.password_confirmation')" class="forget-input" type="password" show-password>
            <i class="el-input__icon fas fa-unlock-alt" slot="prefix"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <alert ref="Alert" :mark="[url, code_url]" class="alert"/>
      <el-button :loading="requesting" @click="retrieve(vm, form)" class="forget-button" type="primary" size="default">
        <span class="forget-text">{{ $transform('button.retrieve_password') }}</span>
      </el-button>
    </div>
    <div v-else>
      <div class="modify-psd">{{ $transform('forget.mobile') }}</div>
      <div class="set-success">
        <div>{{ $transform('forget.set_success') }}</div>
        <div>
          <span class="count-text">{{ count_login + 's' }}</span>
          <span>{{ $transform('forget.login') }}</span>
        </div>
      </div>
      <el-button :loading="requesting" @click="loginNow(form)" class="forget-button" type="primary" size="default">
        <span class="forget-text">{{ $transform('button.login_now') }}</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import requesting from '../../global/js/mixin/requesting'
import {getCode, retrieve, loginNow} from './forget'

export default {
  name: 'forget',
  components: {
    Alert: () => import('../../components/Tool/Alert')
  },
  mixins: [requesting],
  created() {
    this.rule = this.$verify('forget', this.$deepCopy(this.form), this)
  },
  data() {
    return {
      vm: this,
      url: '/Customer/ForgotPassword',
      code_url: '/Customer/ForgotCode',
      show_code: true,
      count_code: '',
      timer_code: null,
      modify_psd: true,
      form: {
        mobile: '',
        code: '',
        password: '',
        password_confirmation: ''
      },
      rule: {},
      count_login: '',
      timer_login: null
    }
  },
  methods: {
    retrieve,
    getCode,
    loginNow
  }
}
</script>

<style lang="scss" scoped>

  .forget-card {
    position: relative;
    width: 400px;
    background: rgba(255, 255, 255);

    .modify-psd {
      font-size: 18px;
      color: #28396b;
      margin-bottom: 20px;
      margin-left: 40px;
      text-align: left;
    }

    .form {
      text-align: left;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 40px;
      height: 100%;

      .code {
        color: #599ef8;
        margin-right: 15px;
        font-weight: 700;
        cursor: pointer;
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

    .set-success {
      color: #999999;
      font-size: 14px;
      margin: 50px 0 60px 40px;
      text-align: left;
      .count-text {
        color: #60a5f8;
        font-weight: 700;
      }
    }

    .forget-button {
      width: 80%;
      .forget-text {
        letter-spacing: 3px;
        font-size: 14px;
      }
    }
  }
</style>
