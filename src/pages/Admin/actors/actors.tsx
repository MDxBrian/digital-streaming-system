import { Form, Input, Space, Card, Table, Image, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
// import "./actors.scss";
import actorsAdd from "./actorsAdd";

interface DataType {
  key: React.Key;
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
    // setLoading(true);
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
    imageUrl: <Image width={27} height={23} src={actor.imageUrl} />,
    gender: actor.gender,
    age: actor.age,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 50,
      align: "center",
    },
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
      render: (record: { key: React.Key }) => (
        <>
          <a>View | </a>
          <a
            onClick={() =>
              navigate("/manage/actors/edit", {
                state: {
                  actorId: record.key,
                },
              })
            }
          >
            {" "}
            Edit |{" "}
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

  const handleDelete = async (key: React.Key) => {
    // setLoading(true);
    let res = await api.deleteActors(key);
    if (res) fetch();
    // return setLoading(false);
  };

  return (
    <>
      <Card title="Manage Actors" size="small" style={{ margin: "25px" }}>
        <Link to={"/manage/actors/add"} style={{ margin: "4px" }}>
          Add Actors
        </Link>
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
