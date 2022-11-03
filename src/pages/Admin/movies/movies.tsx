import { Form, Input, Space, Card, Table, Badge } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import "./movies.scss";
import MoviesAdd from "./moviesAdd";

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

const Movies: React.FC = () => (
  <>
    <Card title="Manage Movies" size="small" style={{ margin: "25px" }}>
       <Link to={"/manage/movies/add"}  style={{ margin: "4px"}}>Add Movies</Link>
      <Table style={{ marginTop: "4px"}} bordered columns={columns} dataSource={data} />
    </Card>
  </>
);

export default Movies;
