# React示例项目 

# 前端构建流程
```bash
# 安装nrm
npm install nrm -g

# 增加私服源
nrm add casic http://192.168.0.141:7070/repository/casic-frontend/

# 使用私服源
nrm use casic

#认证
nrm add-auth Y2FzaWM6Y2FzaWM= casic

```

# 迁移方法
* 删除package-lock.json
* npm i casic-common --save
* 删除models/common.js
* 删除services/common.js
* 删除sample-frontend-react/routes
* 删除lib下除了PageLoading和自定义组件的全部文件
* 删除util包下面所有非自定义文件
* 删除style包下面所有非自定义文件
* 修改原引用@/lib到commcon-casic
  ```bash
  # 原来
  import UserSelector from '@/lib/Forms/UserSelector';
  
  # 修改为
  import {UserSelector} from 'casic-common';
  
  
  ```
* 修改services
  ```bash
    # 原来
    import request from '@utils/request';
    # 修改为
    import {request} from 'casic-common';

  ```
* 复制sample-frontend-react/gards覆盖本地工程
* 复制sample-frontend-react/config覆盖本地工程
* 复制sample-frontend-react/layouts覆盖本地工程
* 复制sample-frontend-react/src/pages/passport覆盖本地工程
* 复制sample-frontend-react/src/pages/403,404,500覆盖本地工程
* 复制sample-frontend-react/src/global.less覆盖本地工程， 有自定义的样式请自行再引入
* 删除二级菜单_layout, 菜单统一放到models/menu下，配置参考models/menu
