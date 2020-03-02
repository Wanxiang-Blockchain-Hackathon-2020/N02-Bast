import React from 'react'
import { Layout, Menu, Input, Row, Col, Link} from 'antd';
import homepage from './homepage.js'
import {   
  HomeOutlined,
  SmileOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { Header } = Layout;


export default class HeaderPC extends React.Component {
  render() {
    return (
      <div >
        <Layout>
          <Header className="header"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 100,
            }}
          >
            <div className="head" />
            <Row >
              <Col span={1}>
              <img id='logo' src={require('../img/btcu1.png')} alt='logo' />
              </Col>             
              <Col span={8} offset={2}>
                  <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1"><HomeOutlined />首页</Menu.Item>
                  <Menu.Item key="2">信息公开</Menu.Item>
                  <Menu.Item key="3">公益项目</Menu.Item>
                  <Menu.Item key="4">监管与捐赠</Menu.Item>
                </Menu>
              </Col>
              <Col offset={5}>
                <Search placeholder="xiu~一下" enterButton
                  style={{
                    padding: 24,
                    margin: -5,
                    width: 350,
                  }}
                />
              </Col>
              <Col >
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1">登录|注册</Menu.Item>
                  <Menu.Item key="2"> <SmileOutlined />个人中心</Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>
        </Layout>
      </div>
    )
  }
}