import React, { useState } from "react";
import { Layout, Modal, Col, Row, Button, Form, Input, Checkbox } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export interface IModalProps {
  registerOpen: any;
  setRegisterOpen: any;
}

const api = require ("../../utils/api")

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

  const onSubmit = async (data: any) => {
    // setConfirmLoading(false);
    if (data.password !== data.confirmPassword)
      return alert("Password not match, please try again!");

    const payload = {
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      roleId: 2,
      active: false,
    };

    setLoading(true);
    let res = await api.registerUser(payload);
    if (res) {
      alert(`Registered Success! ${data.fullname}`)
      setRegisterOpen(false)
      setLoading(true);
    }
    return setLoading(false);
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
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Fullname is required!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Email is required!"
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
              message: "Password is required!"
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
              message: "Confirm password is required!"
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
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
