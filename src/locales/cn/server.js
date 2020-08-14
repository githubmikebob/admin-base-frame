const servers = {
  servers: '服务器',
  name: '名称',
  status: '状态',
  ip: 'IP 地址',
  site: '站点路径',
  git: 'Git路径',
  nginx: 'Nginx配置目录',
  ssh_user: 'SSH',
  pass: '密码',
  port: '端口',
  mysql_user: 'MySQL',
  remark: '备注',
  verify: {
    name: {
      required: '请填写服务器名称',
    },
    ip: {
      required: '请填写IP地址'
    },
    site: {
      required: '请填写站点路径'
    }
  },
  validator: {
    name: {
      required: 'true'
    },
    ip: {
      required: 'true'
    },
    site: {
      required: 'true'
    },
  }
};

const sites = {
  sites: '站点',
  type: '类型',
  types: {
    1: '后台',
    2: '后端',
    3: '前端'
  },
  server: '服务器',
  name: '名称',
  host: '域名',
  site: '路径',
  git: 'Git',
  branch: '当前分支',
  branch_info: '分支信息',
  git_init: '已部署',
  ssl: 'HTTPS',
  created: '创建站点',
  updated_at: '更新时间',
  status: '状态',
  if: {
    1: '是',
    2: '否',
  },
  verify: {
    name: {
      required: '请填写站点名称',
    },
    type: {
      required: '请选择类型'
    },
    host: {
      required: '请填写域名'
    },
    site: {
      required: '请填写站点路径'
    },
    server_id: {
      required: '请选择服务器'
    },
    git_id: {
      required: '请选择Git'
    },
    git_init: {
      required: '必选'
    },
    ssl: {
      required: '必选'
    },
    created: {
      required: '必选'
    },
  },
  validator: {
    name: {
      required: 'true'
    },
    type: {
      required: 'true'
    },
    host: {
      required: 'true'
    },
    site: {
      required: 'true'
    },
    server_id: {
      required: 'true'
    },
    git_id: {
      required: 'true'
    },
    git_init: {
      required: 'true'
    },
    ssl: {
      required: 'true'
    },
    created: {
      required: 'true'
    },
  }
};

const git = {
  git: 'Git',
  name: '别名',
  path: '地址',
  verify: {
    name: {
      required: '请填写Git'
    },
    server_id: {
      required: '请选择服务器'
    },
    git: {
      required: '请选择Git'
    },
    path: {
      required: '请填写地址'
    },
  },
  validator: {
    name: {
      required: 'true'
    },
    server_id: {
      required: 'true'
    },
    git: {
      required: 'true'
    },
    path: {
      required: 'true'
    },
  }
};

export default {
  servers, sites, git
}
