import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {userSignupRequest} from '../../actions/registrationActions'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class Registration extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      Password:'',
      confirm:'',
      nickname:'',
      phone:''
    }
  }
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
  }
  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  onFinish = (e) => {
 //   e.preventDefault();
    console.log('Received values of form: ', e);
    //axios.post('api/usr/',{user:this.state})
    this.props.userSignupRequest(this.state)
  };
  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  render(){
    return (
      <Form
        {...formItemLayout}
        name="register"
        onFinish={this.onFinish}
        initialValues={{
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input 
            value={this.state.email}
            name="email"
            type="email"
            onChange={this.onChange}
            
          />
        </Form.Item>
        <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password 
        value={this.state.Password}
        name="Password"
        type="password"
        onChange={this.onChange}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="重复密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password 
        value={this.state.confirm}
        name="confirm"
        type="password"
        onChange={this.onChange}
        />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            昵称&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input 
        value={this.state.nickname}
        name="nickname"
        type="text"
        onChange={this.onChange}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="电话号码"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={this.prefixSelector}
          style={{
            width: '100%',
          }}
          value={this.state.phone}
            name="phone"
            type="text"
            onChange={this.onChange}
        />
      </Form.Item>


      <Form.Item label="验证码" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked" {...tailFormItemLayout}>
        <Checkbox>
          阅读并同意 <a href="">条款</a>
        </Checkbox>
      </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="register-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default connect(null,{userSignupRequest})(Registration) ;
