import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';
import Authorized from 'casic-common/src/utils/Authorized';
import * as service from '../services/user';
import { menu } from '../defaultSettings';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  if (!data) {
    return undefined;
  }
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName && parentName !== '/') {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

const buildMenuData = menus => {
  menus = _.filter(menus, m => m.codeType === 'RES_UA');
  const root = [];
  const map = _.reduce(menus, (ret, menu) => {
    const node = {
      ...menu,
      name: menu.name,
      icon: menu.icon,
      path: menu.url
    };
    if (!node.parentCode) {
      root.push(node);
    }
    _.set(ret, menu.code, node);
    return ret;
  }, {});

  _.forEach(map, menu => {
    if (menu.parentCode) {
      let parent = map[menu.parentCode];
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(menu);
      }
    }
  });

  return root;
};

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {},
  },

  effects: {
    * getMenuDataFormRoute({ payload }, { put }) {
      const { routes, authority, path } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority, path);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routerData: routes },
      });
    },
    * getMenuData({ payload }, { call, put }) {
      const { routes } = payload;
      const { success, data } = yield call(service.resources);
      if (success) {
        const originalMenuData = buildMenuData(data);
        const menuData = filterMenuData(originalMenuData);
        const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
        yield put({
          type: 'save',
          payload: { menuData, breadcrumbNameMap, routerData: routes },
        });
      }
      // const originalMenuData = [
      //   {
      //     icon: 'form',
      //     name: '组件示例',
      //     path: '/sample',
      //     children:[{
      //       icon: 'api',
      //       name: '组件文档',
      //       path: '/sample/api',
      //     },
      //       {
      //         icon: 'bars',
      //         name: '列表页面',
      //         path: '/sample/table',
      //       },{
      //         icon: 'plus',
      //         name: '新增页面',
      //         path: '/sample/new',
      //       },
      //     ]
      //   },
      //   {
      //     icon: 'dashboard',
      //     name: '权限管理',
      //     path: '/uaa',
      //     children: [
      //       {
      //         icon: 'user',
      //         name: '用户管理',
      //         path: '/uaa/user',
      //       },{
      //         icon: 'team',
      //         name: '角色管理',
      //         path: '/uaa/role',
      //       },{
      //         icon: 'cloud-server',
      //         name: '资源管理',
      //         path: '/uaa/resource',
      //       },{
      //         icon: 'safety-certificate',
      //         name: '授权管理',
      //         path: '/uaa/authorize',
      //       },{
      //         icon: 'setting',
      //         name: '权限配置',
      //         path: '/uaa/settings',
      //         children: [
      //           {
      //             icon: 'api',
      //             name: '角色编码',
      //             path: '/uaa/settings/role-code',
      //           },
      //           {
      //             icon: 'api',
      //             name: '资源编码',
      //             path: '/uaa/settings/resource-code',
      //           }
      //         ]
      //       },{
      //         icon: 'delete',
      //         name: '回收站',
      //         path: '/uaa/trash',
      //       }
      //     ]
      //   }
      // ];

    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
