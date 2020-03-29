import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker
} from 'antd';

const { Option } = Select;

class StepOneForm extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.submittedValues(values);
        this.props.handleNextButton();
      }
    });
  };

  render() {
    return (
      <Form layout="vertical" labelAlign="right" onSubmit={this.handleSubmit}>
        <Form.Item name="brand" label="Brand" rules= {[{required: true, message: 'Please insert the brand!'}]}>
          <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a brand"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
          >
              <Option value="audi">Audi</Option>
              <Option value="toyota">Toyota</Option>
              <Option value="honda">Honda</Option>
          </Select>
        </Form.Item>
        <Form.Item name="model" label="Model" rules= {[{required: true, message: 'Please insert the model!'}]}>
          <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select the model"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
          >
              <Option value="audi">A3</Option>
              <Option value="toyota">Landy</Option>
              <Option value="honda">CRV</Option>
          </Select>
        </Form.Item>
        <Form.Item name="year" label="Year" rules= {[{required: true, message: 'Please insert the year!'}]}>
          <DatePicker picker="year" style={{width: '200px'}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

StepOneForm.propTypes = {
  submittedValues: PropTypes.func.isRequired,
  handleNextButton: PropTypes.func.isRequired
};

export default StepOneForm;
