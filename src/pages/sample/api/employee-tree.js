import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import { EmployeeTree } from 'casic-common';

export default class Demo extends PureComponent{

  render() {
    return (
      <Row>
        <Col span={6}>
          组织人员树：<EmployeeTree/>
        </Col>
        <Col span={24} style={{marginTop: 20}}>
          <Card title='使用说明'>

          </Card>
        </Col>
      </Row>
    );
  }
}
