import React, { useState } from "react";
import { Layout, Modal, Col, Row, Button, Form, Input, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Register from "./register";

export interface IModalProps {
  open: any;
  setOpen: any;
}

const api = require("../../utils/api");

function Login({ open, setOpen }: IModalProps) {
  const navigate = useNavigate();

  const [registerOpen, setRegisterOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const showRegisterModal = () => {
    setRegisterOpen(true);
  };

  const onFinish = async (data: any) => {
    console.log("Success:", data);

    const payload = {
      email: data.email,
      password: data.password,
      remember: checked,
    };

    setLoading(true);
    let res = await api.login(payload);
    if (res) {
      window.location.reload();
    }
    return setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <Modal
        title="LOGIN"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
        footer={[
          <Form.Item
            name="register"
            style={{ textAlign: "center", fontSize: "small" }}
          >
            Have no account yet?
            <Link onClick={() => setOpen(false)} to={"/register"}>
              &nbsp; Register
            </Link>
          </Form.Item>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Email is required!",
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
                message: "Password is required!",
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
            <Checkbox checked={checked} onChange={onChange}>
              Remember me
            </Checkbox>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
