import React, { PureComponent } from 'react';
import { Col, Row, Card, Form, Button } from 'antd';
import { OrganizationSelect } from 'casic-common';

@Form.create()
export default class Demo extends PureComponent{

  handleEdit = (e) => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue)
    });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Row>
        <Col span={6}>
          <Form onSubmit={this.handleEdit}>
            <Form.Item>
              <Row>
                <Col spaan={6}>
                  <Button htmlType='submit' type='primary'>确定</Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label='用户选择'>
              {
                getFieldDecorator("users", {
                  initialValue: [{label: 'name', value: 'id'}]
                })(<OrganizationSelect multiple onChange={val => console.log(val)}/>)
              }
            </Form.Item>
          </Form>
        </Col>
        <Col span={24} style={{marginTop: 20}}>
          <Card title='使用说明'>

          </Card>
        </Col>
      </Row>
    );
  }
}
