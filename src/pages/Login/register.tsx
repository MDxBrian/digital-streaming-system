import React, { useState } from "react";
import { Layout, Modal, Col, Row, Button, Form, Input, Checkbox } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export interface IModalProps {
  registerOpen: any;
  setRegisterOpen: any;
}

function Register({ registerOpen, setRegisterOpen }: IModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [loading, setLoading] = useState(false);

  const showRegisterModal = () => {
    setRegisterOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setRegisterOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setRegisterOpen(false);
  };

  const handleCancelRegister = () => {
    console.log("Clicked cancel button");
    setRegisterOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title="REGISTER"
      open={registerOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => setRegisterOpen(false)}
      footer={[
        <Button key="back" onClick={() => setRegisterOpen(false)}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your Full name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 12 }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Register;
