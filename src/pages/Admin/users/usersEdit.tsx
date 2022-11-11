import { useState } from "react";
import { Card, Button, Form, Input, Select, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const apiUsers = require("../../../utils/api/users");
const { Option } = Select;

function UsersEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onSubmit = async (data: any) => {
    const payload = {
      id: location.state.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.roleId,
      active: location.state.active,
    };
    let res = await apiUsers.updateUser(payload);
    if (res.success) {
      setConfirmLoading(true);
      setTimeout(() => {
        message.success(res.message);
        setConfirmLoading(false);
        navigate("/manage/users");
      }, 2000);
    } else {
      message.error(res.message);
    }
    return;
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
          Edit User
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
            initialValue={location.state.firstName}
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
            initialValue={location.state.lastName}
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
            initialValue={location.state.email}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#c5c5c5" }}>Change Role</span>}
            name="roleId"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
            initialValue={location.state.roleId}
          >
            <Select placeholder="CHANGE YOUR ROLE">
              <Option value={1}>ADMIN USER</Option>
              <Option value={2}>NORMAL USER</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#c5c5c5" }}>Is Active?</span>}
            name="active"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Active/Inactive is required!",
              },
            ]}
            initialValue={location.state.active}
          >
            <Select placeholder="CHANGE YOUR ROLE">
              <Option value={true}>ACTIVE</Option>
              <Option value={false}>INACTIVE</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button loading={confirmLoading} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Card>
  );
}

export default UsersEdit;
