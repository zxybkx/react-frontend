import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import { OrganizationTree } from 'casic-common';

export default class Demo extends PureComponent{

  render() {
    return (
      <Row>
        <Col span={24}>
          组织树：<OrganizationTree/>
        </Col>
        <Col span={24} style={{marginTop: 20}}>
          <Card title='使用说明'>

          </Card>
        </Col>
      </Row>
    );
  }
}
