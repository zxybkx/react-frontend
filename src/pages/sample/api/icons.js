import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import { Icons} from 'casic-common';
import homeIcon from '@/assets/icons/home.png'

export default class Demo extends PureComponent{

  render() {
    const src = process.env.NODE_ENV == 'development' ? '/css/iconfont/icons.html' : '/sample/static/css/iconfont/icons.html';
    return (
      <Row>
        <Col span={4}>
          图片图标：<Icons src={homeIcon}/>
        </Col>
        <Col span={4}>
          扩展图标：<Icons extra type='guize1' style={{color: 'red', fontSize: 18}}/>
        </Col>
        <Col span={4}>
          Ant Design图标：<Icons type="heart" theme="twoTone" twoToneColor="#eb2f96" style={{fontSize: 14}}/>
        </Col>
        <Col span={24} style={{marginTop: 20}}>
          <Card title='使用说明'>
            <ul>
              <li>1. 指定src时，采用图片渲染方式，支持size(默认16px)和style， 适用于自定义图片图标</li>
              <li>2. extra={'{true}'}，采用扩展图标， 具体图标请参考: <a target="_blank" href={src}>扩展图标集合</a></li>
              <li>3. 除以上情形，使用antd自带的icons</li>
            </ul>
          </Card>
        </Col>
      </Row>
    );
  }
}
