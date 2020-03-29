import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
      // If logged in and user navigates to Register page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
      }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const newUser = this.props.form.getFieldsValue();
        this.props.registerUser(newUser, this.props.history);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['password2'], { force: true });
    }
    callback();
  };

  handleEmailChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['@gmail.com', '@hotmail.com', '@outlook.com'].map(emailEnding => `${value}${emailEnding}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16, pull: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8, pull: 1 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 14,
        },
      },
    };
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="61">+61</Option>
          <Option value="56">+56</Option>
        </Select>
      </Form.Item>
    );

    const emailOptions = autoCompleteResult.map(email => (
      <AutoCompleteOption key={email}>{email}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item name="name" label="First name" rules= {[{ required: true, message: 'Please insert your name!'}]}>
          <Input/>
        </Form.Item>
        <Form.Item name="lastname" label="Last name" rules= {[{required: true, message: 'Please insert your lastname!'}]}>
          <Input/>
        </Form.Item>
        <Form.Item name="birthdate" label="Birthdate" rules= {[{required: true, message: 'Please insert your birthdate!'}]}>
          <DatePicker style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail" 
          rules= {
            [{
              required: true, 
              message: 'The input is not valid E-mail!'
            },
            {
              required: true, 
              message: 'Please input your E-mail!'
            }]
          }
        >
          <AutoComplete
            dataSource={emailOptions}
            onChange={this.handleEmailChange}
            placeholder="email"
          >
            <Input />
          </AutoComplete>
        </Form.Item>
        <Form.Item 
          name="password"
          label="Password" 
          hasFeedback
          rules= {
            [{
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: this.validateToNextPassword,
            }]
          }
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password"
          label="Confirm Password"
          hasFeedback
          rules= {
            [{
              required: true,
              message: 'Please re-enter your password!',
            },
            {
              validator: this.validateToNextPassword,
            }]
          }
        >
          <Input.Password onBlur={this.handleConfirmBlur} />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number" rules= {[{ required: true, message: 'Please input your phone number!'}]}>
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="agreement" valuePropName="checked" {...tailFormItemLayout}>
          <Checkbox>
            I have read the <Link>agreement</Link> (To do)
          </Checkbox>
          <Button type="primary" htmlType="submit" style={{width: '80%'}}>
            Register
          </Button>
          <span style={{display: 'block'}}>Already have an account? <Link to="/login">Login!</Link></span>
        </Form.Item>
      </Form>
    );
  }
}

RegistrationForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegistrationForm));
