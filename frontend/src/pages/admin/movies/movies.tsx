import { Rate, Image, Card, Table, Popconfirm, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import "./movies.scss";

import { useAppDispatch } from "../../../redux/store/hooks";
import { removeMovies } from "../../../redux/actions/movies";

const apiMovies = require("../../../utils/api/movies");
const apiReviews = require("../../../utils/api/reviewers");

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
  votes: string;
  actorsId: string[];
}

const Movies = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  const [ loading, setLoading ] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    let res = await apiMovies.getAllMovies();
    const resAllReviewers = await apiReviews.getAllReviewers();
    let newObj: any = [];
    res.map(async (movies: DataType) => {
      let newObjReviewer: any = [];
      let num = 0;
      let total = 0;
      resAllReviewers.map((val: any) => {
        if (val.movieId === movies.id) {
          total += 1;
          newObjReviewer.push(val.rate);
        }
      });
      const sum: number = newObjReviewer.map((val: number) => val + num);
      const rtnAvg = sum / newObjReviewer.length;
      const rating = rtnAvg ? rtnAvg : 0;
      newObj.push({
        key: movies.id,
        id: movies.id,
        title: movies.title,
        imageUrl: movies.imageUrl,
        budgetCost: movies.budgetCost,
        yearOfRelease: movies.yearOfRelease,
        runningTime: movies.runningTime,
        director: movies.director,
        description: movies.description,
        actorsId: movies.actorsId,
        ratingAvg: rating,
        votes: newObjReviewer.length,
      });
      setMovieList(newObj);
    });
    return setLoading(false);
  };

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
      filteredValue: [searchText],
      onFilter: (value: any, record) => {
        return (
          String(record.title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.director).toLowerCase().includes(value.toLowerCase())
        );
      },
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
      render: (record) => `$ ${record}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      title: "Year of Release",
      dataIndex: "yearOfRelease",
      key: "yearOfRelease",
      width: 150,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (record): any => (
        <>
          <a
            onClick={() =>
              navigate("/manage/movies/details", {
                state: {
                  id: record.id,
                  title: record.title,
                  imageUrl: record.imageUrl.props.src,
                  director: record.director,
                  budgetCost: record.budgetCost,
                  description: record.description,
                  duration: record.runningTime,
                  yearOfRelease: record.yearOfRelease,
                },
              })
            }
          >
            View |
          </a>
          <a
            onClick={() =>
              navigate("/manage/movies/edit", {
                state: {
                  id: record.id,
                  title: record.title,
                  imageUrl: record.imageUrl.props.src,
                  budgetCost: record.budgetCost,
                  yearOfRelease: record.yearOfRelease,
                  runningTime: record.runningTime,
                  director: record.director,
                  description: record.description,
                  actorsId: record.actorsId,
                },
              })
            }
          >
            &nbsp; Edit |&nbsp;
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

  const handleDelete = async (id: string) => {
    dispatch(removeMovies(id));
    let res = await apiMovies.deleteMovies(id);
    if (res) fetch();
  };

  const dataAllMovies = movieList.map((val: DataType) => ({
    key: val.id,
    id: val.id,
    title: val.title,
    imageUrl: <Image width={27} height={23} src={val.imageUrl} />,
    budgetCost: val.budgetCost,
    yearOfRelease: val.yearOfRelease,
    runningTime: val.runningTime,
    director: val.director,
    description: val.description,
    actorsId: val.actorsId,
    votes: val.votes,
    ratingAvg: (
      <span>
        <Rate disabled allowHalf value={val.ratingAvg} />
        <small> &nbsp; {val.votes} votes </small>
      </span>
    ),
  }));

  return (
    <>
      <Card
        title="Manage Movies"
        size="small"
        style={{ margin: "25px", boxShadow: "10px 10px 5px #dee0e3" }}
      >
        <Link to={"/manage/movies/add"} style={{ margin: "4px" }}>
          Add Movies
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
          loading={loading}
          columns={columns}
          dataSource={dataAllMovies}
        />
      </Card>
    </>
  );
};

export default Movies;
