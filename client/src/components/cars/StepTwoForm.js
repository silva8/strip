import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Select,
  Checkbox
} from 'antd';

const { Option } = Select;

class StepTwoForm extends Component {

  render() {
    let showing = true;
    if (this.props.currentStep !== 2) {
      showing = false;
    }
    return (
      <div style={{ display: (showing ? 'block' : 'none') }}>
        <h1>Enter your car details</h1>
        <Form.Item name="plate" rules= {[{required: true, message: 'Please insert your plate!'}]}>
          <Input placeholder="Insert your plate" style={{width: '200px'}}/>
        </Form.Item>
        <Form.Item name="color" rules= {[{required: true, message: 'Please insert the color!'}]}>
          <Select
              style={{ width: 200 }}
              placeholder="Select the color"
          >
              <Option value="red">Red</Option>
              <Option value="blue">Blue</Option>
              <Option value="white">White</Option>
              <Option value="black">Black</Option>
              <Option value="green">Green</Option>
          </Select>
        </Form.Item>
        <Form.Item name="nseats" rules= {[{required: true, message: 'Please insert the number of seats!'}]}>
          <Select
              style={{ width: 200 }}
              placeholder="Insert the number of seats"
          >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
          </Select>
        </Form.Item>
        <Form.Item name="ac">
          <Checkbox>A/C</Checkbox>
        </Form.Item>
      </div>
    );
  }
}

StepTwoForm.propTypes = {
  currentStep: PropTypes.number.isRequired
};

export default StepTwoForm;
