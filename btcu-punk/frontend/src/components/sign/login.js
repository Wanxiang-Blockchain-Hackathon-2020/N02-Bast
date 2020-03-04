import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const NormalLoginForm = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  const propTypes = {
    form: PropTypes.objectOf(
      PropTypes.func.isRequired 
    ).isRequired,
    login: PropTypes.func.isRequired
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const JSONvalues = JSON.stringify(values)
        console.log('Received values of form: ', JSONvalues, values)
        // let url = 'http://localhost:3001/users/login'
        let url = 'http://120.79.186.162:3001/users/login'
        fetch(url,
          {
            name: 'data',
            method: 'POST',
            body: JSONvalues,
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
          })
          .then(res => {
            console.log(res)
            if (res.status === 500) {
              throw new Error('用户名或密码错误')
            } else {
              return res.json()
            }
          })
          .then(res => {
            console.log(res)
            this.setState({
              user: res[0]
            })
            this.props.login(res[0])
            this.setState({
              loginVisible: false,
              isLogined: true
            })
            console.log(this.state, 'user')
          })
          .catch(err => {
            console.log(err.message)
            alert(err.message)
          })
      }
    })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onSubmit={handleSubmit}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住账号</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};


export default NormalLoginForm;