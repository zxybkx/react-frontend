import React, { PureComponent, Fragment} from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  message,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import {UserSelector, AvatarUploader, FileUploader, PictureUploader} from 'casic-common';

const FormItem = Form.Item;

@Form.create({
  //特殊字段解析示例
  mapPropsToFields(props) {
    const model = {};
    const date = moment(_.get(props.model, 'date')).format('YYYY-MM-DD');
    _.map(props.model, (v, k) => {
      if (k === 'date') {
        _.set(model, k, moment(v));
      } else if (k === 'begin' || k === 'end') {
        _.set(model, k, moment(`${date} ${v}`));
      } else if (k === 'members') {
        _.set(model, k, _.map(v, (member, idx) => ({ key: member.id, id: member.id, label: member.xm })));
      } else {
        _.set(model, k, v);
      }
    });
    return _.mapValues(model, v => Form.createFormField({value: v }));
  },
})
export default class EditForm extends PureComponent {

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.visible === nextProps.visible) {
      return null;
    }
    return {
      ...nextProps,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  handleEdit = (e, close) => {
    e.preventDefault();

    const { dispatch, form, doQuery, onClose } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      //选人组件
      values.members = _.map(values.members, u => ({id: u.key, xm: u.label}));

      console.log(values);
      return false;

      if (values.id) {
        dispatch({
          type: 'oa/updateSchedule',
          payload: values,
        }).then(({ success, data }) => {
          if (success) {
            message.success('操作成功');
            doQuery && doQuery();
            if (close) {
              onClose && onClose();
            }
          }
        });
      } else {
        dispatch({
          type: 'oa/saveSchedule',
          payload: values,
        }).then(({ success, data }) => {
          if (success) {
            message.success('操作成功');
            doQuery && doQuery();
            if (close) {
              onClose && onClose();
            }
          }
        });
      }
    });
  };

  getExpandKeys = (parent, ret = []) => {
    ret.push(parent.id);
    if (parent.parent) {
      this.getExpandKeys(parent, ret);
    }
    return ret;
  };

  render() {
    let { form: { getFieldDecorator }, model = {} } = this.props;

    return (
      <div style={{ padding: 20 }}>
        <h1>通用表单组件示例</h1>
        <Form onSubmit={this.handleEdit}>
          <Row>
            <Col span={16}>
              <FormItem label='头像' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {
                  getFieldDecorator('acatar', {
                    rules: [{ required: true, message: '头像不能为空' }],
                  })(
                    <AvatarUploader preview={[64, 32, 16]}/>,
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem label="参与者" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>
                {getFieldDecorator('members', {
                  rules: [{ required: true, message: '参与者不能为空' }],
                })(
                  <UserSelector/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem label="附件" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>
                {getFieldDecorator('files', {
                  rules: [{ required: true, message: '附件不能为空' }],
                  initialValue: [{ id: 'xxxx', name: '测试文档' }],
                })(
                  <FileUploader maxSize={3}/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem label="附件" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>
                {getFieldDecorator('pictures', {
                  rules: [{ required: true, message: '附件不能为空' }],
                })(
                  <PictureUploader  maxSize={3}/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem wrapperCol={{ offset: 4 }}>
                {
                  model.id && (
                    <Button type={'primary'} style={{ marginRight: 5 }} icon='form' onClick={e => this.handleEdit(e, true)}>修改</Button>
                  )
                }
                {
                  !model.id && (
                    <Fragment>
                      <Button type={'primary'} style={{ marginRight: 5 }} icon='plus' onClick={this.handleEdit}>添加</Button>
                      <Button type={'primary'} icon='plus' onClick={e => this.handleEdit(e, true)}>添加并关闭</Button>
                    </Fragment>
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
