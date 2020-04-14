import React, { PureComponent } from 'react';
import { Col, Row, Card, Form, Button } from 'antd';
import { DatePicker, TimePicker, session } from 'casic-common';
import moment from 'moment';

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
    const currentUser = session.get();
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
            <Form.Item label='日期选择'>
              {
                getFieldDecorator("date", {
                  initialValue: moment()
                })(<DatePicker/>)
              }
            </Form.Item>
            <Form.Item label='日期选择(带时间)'>
              {
                getFieldDecorator("dateTime", {
                  initialValue: moment()
                })(<DatePicker showTime/>)
              }
            </Form.Item>
            <Form.Item label='时间选择'>
              {
                getFieldDecorator("time", {
                  initialValue: moment()
                })(<TimePicker/>)
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
