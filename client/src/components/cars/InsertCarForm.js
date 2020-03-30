import React, { Component } from "react";
import { Form, Button } from 'antd';
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";

class InsertCarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1, // Default is Step 1
    };
  }

  nextButton = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep === 2 ? 2 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };

  backButton = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep === 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };
  
  onFinish = values => {
    console.log('Received values of form: ', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  render() {
    const currentStep = this.state.currentStep;
    let buttons;
    if (currentStep === 1) {
      buttons = (
        <Form.Item>
          <Button type="primary" onClick={this.nextButton}>
            Next
          </Button>
        </Form.Item>
      );
    }
    else if(currentStep === 2) {
      buttons = (
        <Form.Item>
          <Button type="default" onClick={this.backButton}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      );
    }
    return (
      <Form layout="vertical" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
        <StepOneForm currentStep={this.state.currentStep} />
        <StepTwoForm currentStep={this.state.currentStep} />
        {buttons}
      </Form>
    );
  };
}

export default InsertCarForm;