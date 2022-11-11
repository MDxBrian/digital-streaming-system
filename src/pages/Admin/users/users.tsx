import { Card, Table, message, Popconfirm, Tag } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

interface DataType {
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
        <Tag color={`${data === 1 ? "#afe5dc" : "cyan"}`}>
          {data === 1 ? "ADMIN USER" : "NORMAL USER"}{" "}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (data): any => (
        <span>
          <Tag style={{ width: 100 }} color={data ? "success" : "error"}>
            {data ? "ACTIVE" : "INACTIVE"}
          </Tag>
        </span>
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
                  id: record.id,
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
            onConfirm={() => handleDelete(record.id)}
          >
            <a> Delete </a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    let res = await api.deleteUsers(id);
    if (res.success) {
      fetch();
    } else {
      message.error(res.message);
    }
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
