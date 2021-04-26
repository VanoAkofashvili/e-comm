import React from "react";
import {Button, Form, Input, Select} from "antd";
import {Link} from "react-router-dom";

const {Option} = Select;

export const Register = () => {

  const isValidNumber = (e) => {
    e.preventDefault()
  }

  const selectAfterEmail = (
    <Select defaultValue="@gmail.com" className="select-after">
      <Option value="@gmail.com">@gmail.com</Option>
      <Option value="@yahoo.com">@yahoo.com</Option>
      <Option value="@sweeft.com">@sweeft.com</Option>
    </Select>
  );

  const selectBeforePhone = (
    <Select defaultValue="+995" className="select-before">
      <Option value="+995">+995</Option>
    </Select>
  )


  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <Form
    className="auth-form"
    name="login"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input your phone!',
        },
      ]}
    >
     <Input maxLength={9} onKeyDown={(e) => isValidNumber(e)} addonBefore={selectBeforePhone} />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input addonAfter={selectAfterEmail}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password/>
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirm_password"
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
      ]}
    >
      <Input.Password/>
    </Form.Item>


    <Form.Item>
      <Button type="primary" htmlType="submit">
        Sign Up
      </Button>
      <p>
        <small>Already have an account?</small> <Link to="/login">Sign In Now</Link>
      </p>
    </Form.Item>
  </Form>
}