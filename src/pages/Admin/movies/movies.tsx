import { Form, Rate, Image, Card, Table, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import "./movies.scss";
import MoviesAdd from "./moviesAdd";

const apiMovies = require("../../../utils/api/movies");

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
  ratingAvg: any
  actorsId: string[];
}

const Movies = () => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    let res = await apiMovies.getAllMovies();
    setMovieList(res);
  };

  const data = movieList.map((movies: DataType) => ({
    key: movies.id,
    id: movies.id,
    title: movies.title,
    imageUrl: <Image width={27} height={23} src={movies.imageUrl} />,
    budgetCost: movies.budgetCost,
    yearOfRelease: movies.yearOfRelease,
    runningTime: movies.runningTime,
    director: movies.director,
    description: movies.description,
    actorsId: movies.actorsId,
    ratingAvg:  <Rate disabled defaultValue={2} />
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Director",
      dataIndex: "director",
      key: "director",
      align: "center",
    },
    {
      title: "Running Time",
      dataIndex: "runningTime",
      key: "runningTime",
      width: 200,
      align: "center",
    },
    {
      title: "Budget Cost",
      dataIndex: "budgetCost",
      key: "budgetCost",
      width: 150,
      align: "center",
    },
    {
      title: "Year of Release",
      dataIndex: "yearOfRelease",
      key: "yearOfRelease",
      width: 150,
      align: "center",
    },
    {
      title: "Rating Avg%",
      dataIndex: "ratingAvg",
      key: "ratingAvg",
      width: 200,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (record: { key: React.Key }) => (
        <>
          <a> View | </a>
          <a
            onClick={() =>
              navigate("/manage/actors/edit", {
                state: {
                  actorId: record.key,
                },
              })
            }
          >
            {" "} Edit |{" "}
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
    let res = await apiMovies.deleteMovies(key);
    if (res) fetch();
    // return setLoading(false);
  };

  return (
    <>
      <Card title="Manage Movies" size="small" style={{ margin: "25px" }}>
        <Link to={"/manage/movies/add"} style={{ margin: "4px" }}>
          Add Movies
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

export default Movies;
