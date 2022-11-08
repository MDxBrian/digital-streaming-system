import { useState } from "react";
import { message, Modal, Button, Form, Input, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

export interface IModalProps {
  open: any;
  setOpen: any;
}

const api = require("../../utils/api");

function Login({ open, setOpen }: IModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const onFinish = async (data: any) => {
    const payload = {
      email: data.email,
      password: data.password,
      remember: checked,
    };
    let res = await api.login(payload);
    if (res) {
      setConfirmLoading(true);
      message.success("Successfully Login!");
      setTimeout(() => {
        setConfirmLoading(false);
        return window.location.reload();
      }, 1000);
    } else {
      return message.error("Login Failed");
    }
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
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
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
            hasFeedback
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
            <Button
              loading={confirmLoading}
              type="primary"
              htmlType="submit"
              style={{ float: "right" }}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
