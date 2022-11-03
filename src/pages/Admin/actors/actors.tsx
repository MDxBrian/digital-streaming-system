import { Form, Input, Space, Card, Table, Badge } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
// import "./actors.scss";
import actorsAdd from "./actorsAdd";

interface DataType {
  key: string;
  title: string;
  image: string;
  cost: string;
  yearRelease: number;
  actor: string[];
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "Year Release",
    dataIndex: "yearRelease",
    key: "yearRelease",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    title: "John Brown",
    image: "Gello",
    cost: "32.00",
    yearRelease: 2022,
    actor: ["sada"],
    description: "test"
  },
];


export default function Actors() {
  return (
    <>
    <Card title="Manage Actors" size="small" style={{ margin: "25px" }}>
       <Link to={"/manage/actors/add"}  style={{ margin: "4px"}}>Add Actors</Link>
      <Table style={{ marginTop: "4px"}} bordered columns={columns} dataSource={data} />
    </Card>
  </>
  )
}
