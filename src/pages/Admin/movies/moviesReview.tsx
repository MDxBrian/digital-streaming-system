import React, { useEffect, useState } from "react";
import { Tag, Rate, Image, Card, Table, Popconfirm, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  id: string;
  title: string;
  imageUrl: any;
  budgetCost: number;
  yearOfRelease: string;
  runningTime: string;
  director: string;
  description: string;
  ratingAvg: any;
  actorsId: string[];
}

const apiReviewers = require("../../../utils/api/reviewers");

const MoviesReview = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (data) => {
        return data;
      },
      width: 250,
    },
    {
      title: "Description",
      dataIndex: "content",
      key: "content",
      align: "left",
      width: "40%",
    },
    {
      title: "Posted Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      align: "center",
    },
    {
      title: "Rating",
      dataIndex: "rate",
      key: "rate",
      width: 200,
      align: "center",
      render: (data) => <Rate disabled value={data} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (data) => (
        <Tag color={data === "PENDING" ? "error" : "success"}>{data}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (record): any => (
        <>
          <Popconfirm
            title="ARE YOU SURE?"
            onConfirm={() => handleSubmit(record)}
          >
            <Button
              size="small"
              type="primary"
              style={{ borderRadius: "10px" }}
            >
              {record.status === "PENDING" ? "APPROVED" : "CANCEL"}
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const fetch = async () => {
    let res = await apiReviewers.getAllReviewers();
    setReviewList(res);
  };

  const handleSubmit = async (data: any) => {
    let newStatus: string = data.status === "APPROVED" ? "PENDING" : "APPROVED";
    const payload = {
      id: data.id,
      content: data.content,
      date: data.date,
      movieId: data.movieId,
      rate: data.rate,
      title: data.title,
      userId: data.userId,
      status: newStatus,
    };
    let res = await apiReviewers.approveReviewer(payload);
    if (res) fetch();
  };

  return (
    <>
      <Card
        title="Manage Movies"
        size="small"
        style={{ margin: "25px", boxShadow: "10px 10px 5px #dee0e3" }}
      >
        <Table
          style={{ marginTop: "4px" }}
          bordered
          // loading={loading}
          columns={columns}
          dataSource={reviewList}
        />
      </Card>
    </>
  );
};

export default MoviesReview;
