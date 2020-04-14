import React, { PureComponent } from 'react';
import { message, Modal, Col, Row, Card, Form, Button } from 'antd';
import { UserSelectPanel } from 'casic-common';

@Form.create()
export default class Demo extends PureComponent {

  state = {
    selectEmployee: [],
    visible: false,
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  handleEdit = (e) => {
    e.preventDefault();

    const { selectEmployee } = this.state;

    message.success(JSON.stringify(selectEmployee));

    this.setState({visible: false})
  };

  render() {
    const { visible } = this.state;
    return (
      <Row>
        <Col span={6}>
          <Button type='primary' onClick={() => this.setState({ visible: true })}>选择</Button>
          <Modal
            title='员工选择'
            modal
            centered
            width={1020}
            visible={visible}
            onCancel={this.onClose}
            bodyStyle={{ padding: 0 }}
            footer={[
              <Button key="back" onClick={this.onClose}>
                取消
              </Button>,
              <Button type='primary' key="confirm" onClick={this.handleEdit}>
                确定
              </Button>,
            ]}>
            <UserSelectPanel onSelect={data => this.setState({ selectEmployee: data })} useGroup={false} multiple/>
          </Modal>
        </Col>
        <Col span={24} style={{ marginTop: 20 }}>
          <Card title='使用说明'>
            <ul>
              <li>useGroup: 是否显示群组标签</li>
              <li>multiple: 是否多选</li>
              <li>onSelect: 选择回调</li>
            </ul>
          </Card>
        </Col>
      </Row>
    );
  }
}
