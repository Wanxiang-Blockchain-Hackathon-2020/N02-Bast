import React  from 'react'
import { 
  Layout, 
  Menu, 
  Input, 
  Row, 
  Col, 
  Modal, 
  Tabs, } from 'antd';
import {   
  HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
//import homepage from './homepage.js'
import RegistrationForm from './sign/register.js'
import NormalLoginForm from './sign/login.js'

const { TabPane } = Tabs;
const { Search } = Input;
const { Header } = Layout;



export default class HeaderPC extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  
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
                  <Menu.Item key="1" >
                  <Link to='/home' ><HomeOutlined />首页</Link>
                  </Menu.Item>
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
                  key="1" type="primary" onClick={this.showModal}
                >
                  <Menu.Item >登录|注册</Menu.Item>
                </Menu>
                  <Modal
                  width={460}
                  title="登录|注册"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={null}
                >
                <Tabs defaultActiveKey='1'>
                  <TabPane key='1' tab='登录'>
                  <NormalLoginForm />
                  </TabPane>
                  <TabPane key='2' tab='注册'>
                  <RegistrationForm/>
                  </TabPane>
                  </Tabs>
                   
                </Modal>
              </Col>
            </Row>
          </Header>
        </Layout>
      </div>
    )
  }
}