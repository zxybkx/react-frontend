import React, { PureComponent } from 'react';
import { Col, Row, Card, Form, Button } from 'antd';
import { AvatarSelector, session, UserSelector } from 'casic-common';

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
            <Form.Item label='头像选择'>
              {
                getFieldDecorator("users", {
                  initialValue: [{name: currentUser.name, username: currentUser.username, key: currentUser.username, label: currentUser.username}]
                })(<AvatarSelector multiple title='头像选择' placement='top'  onChange={val => console.log(val)}/>)
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
