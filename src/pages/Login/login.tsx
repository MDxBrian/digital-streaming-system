import React, {useState} from "react";
import { Layout, Modal, Col, Row, Button, Form, Input, Checkbox } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./register";

export interface IModalProps {
  open: any
  setOpen: any
}

function Login({ open, setOpen }: IModalProps) {
  const [registerOpen, setRegisterOpen] = useState(false);
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
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
    <div>   
      {registerOpen && <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen}/> }
      <Modal
        title="LOGIN"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Form.Item
            name="register"
            style={{ textAlign: "center", fontSize: "small" }}
          >
            Have no account yet?
            <Link onClick={showRegisterModal} to={""}>
              {" "}
              Register{" "}
            </Link>
          </Form.Item>,
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 12 }}
          >
            <Checkbox>Remember me</Checkbox>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Login;
