import { Form, Input, Space, Card, Table, Image, Popconfirm, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
// import "./actors.scss";

interface DataType {
  key: React.Key;
  id: string;
  firstName: string;
  lastName: string;
  roleId: number;
  active: boolean;
  email: string;
}

const api = require("../../../utils/api/users");

const Users = () => {
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    let res = await api.getAllUsers();
    setUserList(res);
  };

  const data = userList.map((val: DataType) => ({
    key: val.id,
    id: val.id,
    firstName: val.firstName,
    lastName: val.lastName,
    roleId: val.roleId,
    active: val.active,
    email: val.email,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role Name",
      dataIndex: "roleId",
      key: "roleId",
      align: "center",
      render: (data) => (
        <Tag color="cyan"> {data == 1 ? "ADMIN USER" : "NORMAL USER"} </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (data): any => (
        <Tag color={data ? "success" : "error"}>
          {data ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 200,
      render: (record) => (
        <>
          <a
            onClick={() =>
              navigate("/manage/users/edit", {
                state: {
                  id: record.key,
                  firstName: record.firstName,
                  lastName: record.lastName,
                  email: record.email,
                  roleId: record.roleId,
                  active: record.active,
                },
              })
            }
          >
            Edit &nbsp; | &nbsp;
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a> Delete </a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = async (id: React.Key) => {
    let res = await api.deleteUsers(id);
    if (res) fetch();
    return;
  };

  return (
    <>
      <Card
        title="Manage Users"
        size="small"
        style={{ margin: "25px", boxShadow: "10px 10px 5px #dee0e3" }}
      >
        <Table
          style={{ marginTop: "4px" }}
          bordered
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
};

export default Users;
