import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Select,
  DatePicker
} from 'antd';

const { Option } = Select;

class StepOneForm extends Component {

  render() {
    let showing = true;
    if (this.props.currentStep !== 1) {
      showing = false;
    }
    return (
      <div style={{ display: (showing ? 'block' : 'none') }}>
        <h1>Which car do you have?</h1>
        <Form.Item name="brand" rules= {[{required: true, message: 'Please insert the brand!'}]}>
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
        <Form.Item name="model" rules= {[{required: true, message: 'Please insert the model!'}]}>
          <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select the model"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
          >
              <Option value="a3">A3</Option>
              <Option value="landy">Landy</Option>
              <Option value="crv">CRV</Option>
          </Select>
        </Form.Item>
        <Form.Item name="year" rules= {[{required: true, message: 'Please insert the year!'}]}>
          <DatePicker picker="year" style={{width: '200px'}}/>
        </Form.Item>
      </div>
    );
  }
}

StepOneForm.propTypes = {
  currentStep: PropTypes.number.isRequired
};

export default StepOneForm;
