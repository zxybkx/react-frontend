import React, { PureComponent } from 'react';
import { Card, Col, Menu, Row, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PageLayout from '@/layouts/PageLayout';
import styles from '../index.less';
import { Icons } from 'casic-common';

const { SubMenu } = Menu;

const breadcrumbs = [
  { icon: 'home', path: '/' },
  { label: '示例功能', path: '/sample' },
  { label: '组件文档' },
];

@connect()
export default class Api extends PureComponent {

  render() {
    const { children } = this.props;
    return (
      <PageLayout className={styles.default} breadcrumb={breadcrumbs}>
        <Row gutter={8}>
          <Col span={4}>
            <Menu  mode="inline">
              <SubMenu key={'rules'}
                       title={
                         <span>
                         <Icon
                           type="check-circle"
                           theme="twoTone"
                         />
                         <span>准备工作</span>
                       </span>
                       }
              >
                <Menu.Item key="1">前期工作</Menu.Item>
                <Menu.Item key="2">编译</Menu.Item>
                <Menu.Item key="3">菜单</Menu.Item>
              </SubMenu>
              <SubMenu key={'component'}
                       title={
                         <span>
                         <Icon
                           type="database"
                           theme="twoTone"
                         />
                         <span>组件</span>
                       </span>
                       }
              >
                <Menu.Item><Link to='/sample/api/icons'>图标</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/advanced-search'>高级查询组件</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/time-select'>日期时间选择</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/organization-select'>部门选择</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/user-select-panel'>用户选择(面板)</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/avatar-select'>用户选择(头像)</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/user-select'>用户选择(列表)</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/file-upload'>文件上传</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/avatar-upload'>头像上传</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/picture-upload'>图片上传</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/icon-select'>图标选择</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/simple-table'>表格组件</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/organization-tree'>组织树</Link></Menu.Item>
                <Menu.Item><Link to='/sample/api/employee-tree'>人员树</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
          <Col span={20}>
            <Card title='组件示例'>
              {children}
            </Card>
          </Col>
        </Row>
      </PageLayout>

    );
  }
}
