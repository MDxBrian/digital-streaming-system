import React, { useContext, useEffect, useState } from "react";
import { Card, List, Badge } from "antd";
import Login from "../login/login";
import { useNavigate } from "react-router-dom";
import LoaderContext from "../../context/LoaderContext";
import Loader from "../../components/Loader/Loader";

const apiMovies = require("../../utils/api/movies");

const { Meta } = Card;

interface DataType {
  key: React.Key;
  id: string;
  title: string;
  imageUrl: string;
  yearOfRelease: string;
  runningTime: string;
  director: string;
  budgetCost: string;
  description: string;
  ratingAvg: any;
  actorsId: string[];
}

function AdminHome() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);

  const [movieList, setMovieList] = useState([]);
  const [open, setOpen] = useState(false);

  const { loading, setLoading } = useContext(LoaderContext);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    let res = await apiMovies.getAllMovies();
    setMovieList(res);
    setLoading(false);
  };

  const data = movieList.map((movies: DataType) => ({
    key: movies.id,
    id: movies.id,
    title: movies.title,
    imageUrl: movies.imageUrl,
    yearOfRelease: movies.yearOfRelease,
    runningTime: movies.runningTime,
    budgetCost: movies.budgetCost,
    director: movies.director,
    description: movies.description,
    ratingAvg: movies.ratingAvg,
    actorsId: movies.actorsId,
  }));

  return (
    <Loader>
      <Card
        loading={loading}
        title={
          <div style={{ fontWeight: "bolder", color: "#002140" }}>
            LATEST MOVIES
          </div>
        }
        size="small"
        style={{
          margin: "25px",
          borderRadius: "10px",
          boxShadow: "10px 10px 5px #dee0e3",
        }}
        // extra={<a href="#">See more</a>
      >
        <List
          grid={{ gutter: 16, column: 8 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Badge.Ribbon text={item.yearOfRelease}>
                <Card
                  hoverable
                  style={{ width: 190 }}
                  cover={
                    <img
                      style={{
                        padding: "3px",
                        borderRadius: "2px",
                        width: 190,
                        height: 250,
                      }}
                      alt="example"
                      src={item.imageUrl}
                    />
                  }
                  onClick={async () => {
                    navigate("/manage/movies/details", {
                      state: {
                        id: item.id,
                        title: item.title,
                        imageUrl: item.imageUrl,
                        director: item.director,
                        budgetCost: item.budgetCost,
                        description: item.description,
                        duration: item.runningTime,
                        yearOfRelease: item.yearOfRelease,
                      },
                    });
                  }}
                >
                  <Meta
                    title={
                      <label style={{ color: "#002140" }}>{item.title}</label>
                    }
                  />
                  <small style={{ color: "#a6aaae" }}>{item.runningTime}</small>
                </Card>
              </Badge.Ribbon>
            </List.Item>
          )}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />

        {open && <Login open={open} setOpen={setOpen} />}
      </Card>
    </Loader>
  );
}

export default AdminHome;
