export const users = {
  user: '用户',
  nickname: '昵称',
  username: '用户名',
  mobile: '手机号码',
  identity: '身份证',
  salary: '薪资',
  email: '邮箱',
  password: '密码',
  groups: '权限组',
  created_at: '创建时间',
  leaved_at: '离店时间',
  placeholder: {
    password: '密码长度至少需要6位'
  },
  verify: {
    nickname: {
      required: '请填写昵称',
    },
    username: {
      required: '请填写用户名'
    },
    password: {
      required: '请填写密码'
    },
    groups: {
      required: '请填写所属组'
    }
  },
  validator: {
    nickname: {
      required: 'true'
    },
    username: {
      required: 'true'
    },
    password: {
      required: 'true'
    },
    groups: {
      required: 'true'
    }
  }
};

export default users
