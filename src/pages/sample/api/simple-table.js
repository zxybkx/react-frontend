import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import { SimpleTable } from 'casic-common';

const tableColumn = 20;
const totalData = 1500;


export default class Demo extends PureComponent{

  getColumns = () => {
    const columns = [];
    for (let i = 0; i < tableColumn; i++) {
      const col = {
        Header: '测试' + i,
        accessor: 'name' + i,
        width: 150,
      };
      if (i < 4) {
        col.fixed = true;
      }
      columns.push(col);
    }
    return columns;
  };

  getData = () => {
    const datas = [];
    for (let i = 0; i < totalData; i++) {
      const data = { id: i };
      for (let j = 0; j < tableColumn; j++) {
        _.set(data, `name${j}`, `name${i}`);
      }
      datas.push(data);
    }
    return datas;
  };



  componentDidMount() {
    this.table.jumpToPage(2);
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          <SimpleTable checkable
                       ref={c => this.table = c}
                       total={totalData}
                       data={this.getData()}
                       columns={this.getColumns()}/>
        </Col>
        <Col span={24} style={{marginTop: 20}}>
          <Card title='使用说明'>

          </Card>
        </Col>
      </Row>
    );
  }
}
