import React, { useEffect, useState } from 'react'
import { Form, Rate, Image, Card, Table, Popconfirm } from "antd";
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
    ratingAvg: any
    actorsId: string[];
  }
  
const MoviesReview = () => {

    
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    // let res = await apiMovies.getAllMovies();
    // setMovieList(res);
  };

  const data:any =[];
    
  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Posted Date",
      dataIndex: "director",
      key: "director",
      align: "center",
    },
    {
      title: "Rating",
      dataIndex: "runningTime",
      key: "runningTime",
      width: 200,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "budgetCost",
      key: "budgetCost",
      width: 150,
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
            // onClick={() =>
            //   navigate("/manage/actors/edit", {
            //     state: {
            //       actorId: record.key,
            //     },
            //   })
            // }
          >
            {" "} Edit |{" "}
          </a>
          <Popconfirm
            title="Sure to delete?"
            // onConfirm={() => handleDelete(record.key)}
          >
            <a> Delete </a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (

      <Card title="Movie Reviews" size="small" style={{ margin: "25px" }}>
        {/* <Link to={"/manage/movies/add"} style={{ margin: "4px" }}>
          Add Movies
        </Link> */}
        <Table
          style={{ marginTop: "4px", }}
          bordered
          columns={columns}
          dataSource={data}
        />
      </Card>
  )
}

export default MoviesReview
