import React from 'react';
import { Alert } from 'antd';
import PageLayout from '@/layouts/PageLayout';
import {Meta} from 'casic-common';
import styles from './new.less';
import EditForm from './components/EditForm';


const breadcrumbs = [
  { icon: 'home', path: '/' },
  { label: '示例功能', path: '/sample' },
  { label: '新增表单示例' },
];

export default class ScheduleImport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { dispatch } = this.props;
    const { model } = this.state;

    return (
      <PageLayout className={styles.default} breadcrumb={breadcrumbs}>
        <div className={styles.form}>
          <EditForm dispatch={dispatch} model={model} doQuery={()=> console.log("跳转到列表页面还是其他操作流程请自行设计")} onClose={this.onClose}/>
        </div>
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
