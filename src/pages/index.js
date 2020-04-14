import React from 'react';
import { Link } from 'dva/router';
import { Card, Icon, Avatar, Alert } from 'antd';
import PageLayout from '@/layouts/PageLayout';

const { Meta } = Card;

export default class User extends React.Component {
  render() {

    return (
      <PageLayout>
        <Alert description="门户设计请根据实际需求另外设计" type="info"/>
        <Link to='/sample'>
          <Card style={{ width: 300, margin: 8, display: 'inline-block' }}
                actions={
                  [
                    <span><Icon type="eye"/> 查看</span>,
                  ]
                }>
            <Meta
              avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>日程</Avatar>}
              title="示例功能"
              description="示例功能界面"
            />
          </Card>
        </Link>
      </PageLayout>
    );
  }
}
