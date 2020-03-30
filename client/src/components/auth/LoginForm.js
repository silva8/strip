import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class LoginForm extends Component {
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
    this.props.loginUser(values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8, offset: 16, pull: 1},
      },
    };

    return (
          <Form {...formItemLayout} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} initialValues={{ remember: true }}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName='checked'>
                <Checkbox style={{float: 'left'}}>Remember me</Checkbox>
              </Form.Item>
              <Link to="/recover-password" style={{float: 'right'}}>
                Forgot password
              </Link>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);