import React, { Component } from 'react';
import { Button, Col, DatePicker, Input, Popconfirm, Row } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import moment from 'moment';
import { AdvancedSearch, Meta, SimpleTable, ToolBar, Window } from 'casic-common';
import PageLayout from '@/layouts/PageLayout';
import EditForm from './components/EditForm';
import styles from './table.less';

const { Search } = Input;

const breadcrumbs = [
  { icon: 'home', path: '/' },
  { label: '示例功能', path: '/sample' },
  { label: '列表示例' },
];

@connect(state => ({
  loading: state.loading.models.oa,
}))
export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payload: {},
      modalVisible: false,
      list: [],
      total: 0,
      visible: false,
      model: {},
    };

    //查询方法去抖，性能优化
    this.doSearch = _.debounce(this.doSearch, 600);
  }

  componentDidMount() {
    this.doQuery();
  }

  doQuery = () => {
    //请根据实际需要调用接口
    const { dispatch } = this.props;
    const { payload } = this.state;
    dispatch({
      type: 'common/getOrgs',
      payload,
    }).then(({ success, data, page }) => {
      if (success) {
        this.setState({ list: data, total: page.total });
      }
    });
  };

  getDataColumns = () => {
    const columns = [
      {
        Header: '列1',
        accessor: 'date',
        width: 150,
      }, {
        Header: '列2',
        accessor: 'begin',
        width: 80,
      }, {
        Header: '列3',
        accessor: 'end',
        width: 80,
      }, {
        Header: '列4',
        accessor: 'type',
        width: 80,
      }, {
        Header: '列5',
        accessor: 'title',
        width: 200,
      }];
    return columns;
  };


  onClose = () => {
    this.setState({ visible: false });
  };

  renderForm = () => {
    const { dispatch } = this.props;
    const { visible, model } = this.state;
    return (
      <Window
        title='新建日程'
        modal
        visible={visible}
        onClose={this.onClose}>
        <EditForm dispatch={dispatch} model={model} doQuery={this.doQuery} onClose={this.onClose}/>
      </Window>
    );
  };

  doSearch = conditions => {
    console.log(conditions)
    //这里自己实现查询方法
    //payload 放到state是为了分页使用
    // 根据conditions值的状态来切换payload
    const { payload = {} } = this.state;
    this.setState({ payload: { ...payload } }, this.doQuery);
  };

  renderSearch = () => {
    return (
      <Row>
        <Col span={2}><Button size='small' icon='reload'
                              onClick={() => this.setState({ payload: {} }, () => this.doQuery())}/></Col>
        <Col span={11}><DatePicker allowClear size='small' onChange={val => this.doSearch('date', val)}/></Col>
        <Col span={11}><Search allowClear size='small' placeholder='日程/地点' onChange={val => this.doSearch('key', val)}/></Col>
      </Row>
    );
  };

  handleStandardTableChange = ({ page, pageSize, sort, filtered }) => {
    const payload = {
      ...this.state.payload,
      page: page - 1,
      size: pageSize,
    };
    payload['enabled.equals'] = 1;

    if (!_.isEmpty(sort)) {
      payload.sort = _.map(sort, s => `${s.id},${s.desc ? 'desc' : 'asc'}`);
    }
    if (!_.isEmpty(filtered)) {
      _.map(filtered, f => payload[`${f.id}.contains`] = f.value);
    }
    this.setState({ payload }, () => this.doQuery());
  };

  render() {
    const { dispatch, loading = false } = this.props;
    const { list = [], total = 0 } = this.state;

    const tools = [{
      label: '添加',
      icon: 'plus',
      type: 'primary',
      handler: () => this.setState({ visible: true, model: {} }),
    },
      {
        component: <Popconfirm title='数据将有调整，确认吗？'
                               okText="是"
                               cancelText="否"
                               onConfirm={()=> console.log("ok")}>
          <Button size='small' type='primary' icon='upload'>确认操作</Button>
        </Popconfirm>,
        handler: () => {
          dispatch({
            type: 'oa/push',
          });
        },
      }];

    const searchFields = [
      {
        name: 'name', label: '角色名称', type: 'text'
      },
      {
        name: 'code', label: '角色代码', type: 'text'
      },
      {
        name: 'createdTime', label: '角色代码', type: 'date'
      },
      {
        name: 'activated', label: '是否启用', type: 'select', options: [{value: 'T', label: '启用'},{value: 'F', label: '停用'}]
      }
    ];

    //AdvancedSearch useFilter为true 使用的是filter查询，返回的条件默认根据filter封装过，false 使用普通查询查询逻辑后台接口实现
    return (
      <PageLayout className={styles.default} breadcrumb={breadcrumbs}>
        <div className={styles.list}>
          <ToolBar tools={tools} search={<AdvancedSearch useFilter onSearch={this.doSearch} placeholder='角色名称/代码' fields={searchFields}/>}/>
          <SimpleTable loading={loading}
                       filterable={false}
                       columns={this.getDataColumns()}
                       data={list}
                       total={total}
                       showSearch={false}
                       onChange={this.handleStandardTableChange}
          />
        </div>
        {
          this.renderForm()
        }
        <Meta>
          <ul>
            <li>操作说明1</li>
            <li>操作说明2</li>
            <li>操作说明3</li>
          </ul>
        </Meta>
      </PageLayout>
    );
  }
}



