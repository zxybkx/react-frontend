import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import { ToolBar, AdvancedSearch } from 'casic-common';

export default class Demo extends PureComponent{

  doSearch = condition => {
    console.log(condition)
  };

  render() {
    const searchFields = [
      {
        name: 'createdBy', label: '创建人', type: 'user',
      },
      {
        name: 'dept', label: '创建部门', type: 'organization', //labelInValue: true
      },
      {
        name: 'name', label: '会议名称', type: 'text',
      }, {
        name: 'startTime', label: '开始时间', type: 'time',
      }];

    return (
      <Row>
        <Col span={6}>
          <ToolBar search={<AdvancedSearch onSearch={this.doSearch} placeholder='拼音' fields={searchFields}/>}/>
        </Col>
        <Col span={24} style={{marginTop: 20}}>
          <Card title='使用说明'>
            <ul>
              <li>1. 部门和人员选择组件使用方式和单一组件的配置方式一致，有特殊需求直接在field配置中添加， eg: labelInValue: true</li>
            </ul>
          </Card>
        </Col>
      </Row>
    );
  }
}
