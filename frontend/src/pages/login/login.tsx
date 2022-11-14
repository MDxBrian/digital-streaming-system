import { useState } from "react";
import { message, Modal, Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

export interface IModalProps {
  open: any;
  setOpen: any;
}

const api = require("../../utils/api/login");

function Login({ open, setOpen }: IModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (data: any) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    let res = await api.login(payload);
    if (res.success) {
      setConfirmLoading(true);
      message.success(res.message);
      setTimeout(() => {
        setConfirmLoading(false);
        return window.location.reload();
      }, 1000);
    } else {
      message.error(res.message);
    }
  };

  return (
    <Modal
      title="LOGIN"
      open={open}
      confirmLoading={confirmLoading}
      onCancel={() => setOpen(false)}
      footer={[
        <div key={1} style={{ textAlign: "center" }}>
          Have no account yet?
          <Link onClick={() => setOpen(false)} to={"/register"}>
            &nbsp; Register
          </Link>
        </div>,
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
          key={"1"}
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
          key={"2"}
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

        <Form.Item key={"3"} wrapperCol={{ offset: 8, span: 12 }}>
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
  );
}

export default Login;
