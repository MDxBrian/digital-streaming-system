import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Table, Image, Popconfirm, message, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: any;
  age: number;
  gender: string;
}

const api = require("../../../utils/api/actors");

const Actors = () => {
  const navigate = useNavigate();

  const [actorList, setActorList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    let res = await api.getAllActors();
    setActorList(res);
  };

  const data = actorList.map((actor: DataType) => ({
    key: actor.id,
    id: actor.id,
    firstName: actor.firstName,
    lastName: actor.lastName,
    imageUrl: actor.imageUrl,
    gender: actor.gender,
    age: actor.age,
  }));

  const [searchText, setSearchText] = useState("");
  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 50,
      align: "center",
      render: (data) => <Image width={27} height={23} src={data} />,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      filteredValue: [searchText],
      onFilter: (value: any, record) => {
        return (
          String(record.firstName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.lastName).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
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
              navigate("/manage/actors/details", {
                state: {
                  id: record.id,
                  imageUrl: record.imageUrl,
                  firstName: record.firstName,
                  lastName: record.lastName,
                  age: record.age,
                  gender: record.gender,
                },
              })
            }
          >
            View |
          </a>
          <a
            onClick={() =>
              navigate("/manage/actors/edit", {
                state: {
                  id: record.id,
                  imageUrl: record.imageUrl,
                  firstName: record.firstName,
                  lastName: record.lastName,
                  age: record.age,
                  gender: record.gender,
                },
              })
            }
          >
            &nbsp;Edit |
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
    let res = await api.deleteActors(id);
    if (res.success) {
      fetch();
    } else {
      return message.error(res.message);
    }
  };

  return (
    <>
      <Card
        title="Manage Actors"
        size="small"
        style={{ margin: "25px", boxShadow: "10px 10px 5px #dee0e3" }}
      >
        <Link to={"/manage/actors/add"} style={{ margin: "4px" }}>
          Add Actors
        </Link>
        <Input.Search
          placeholder="Search here..."
          style={{ marginBottom: "8px", width: "400px", float: "right" }}
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
        />
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

export default Actors;
