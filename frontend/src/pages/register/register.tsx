import { useState } from "react";
import { Card, Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const api = require("../../utils/api/login");

const Register = () => {
  const navigate = useNavigate();

  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const onSubmit = async (data: any) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      roleId: 2,
      active: false,
    };

    const res = await api.registerUser(payload);
    if (res.success) {
      setConfirmLoading(true);
      setTimeout(() => {
        message.success(res.message);
        setConfirmLoading(false);
        navigate("/register/success");
      }, 2000);
    } else {
      message.error(res.message);
    }
  };

  return (
    <Card
      size="small"
      style={{
        margin: "25px",
        borderRadius: "10px",
        boxShadow: "10px 10px 5px #dee0e3",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5%",
        marginBottom: "auto",
      }}
    >
      <Card
        size="small"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,1) 3%, rgba(0,34,68,1) 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "lighter",
            fontSize: "42px",
            color: "#ffff",
          }}
        >
          REGISTER
        </h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: "#c5c5c5" }}>First Name</span>}
            name="firstName"
            hasFeedback
            rules={[
              {
                required: true,
                message: "First name is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#c5c5c5" }}>Last Name</span>}
            name="lastName"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Last name is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#c5c5c5" }}>Email</span>}
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
            label={<span style={{ color: "#c5c5c5" }}>Password</span>}
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
            label={<span style={{ color: "#c5c5c5" }}>Confirm Password</span>}
            dependencies={["password"]}
            hasFeedback
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Confirm password is required!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please try again, password does not math!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button loading={confirmLoading} type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Card>
  );
};

export default Register;
