import React, { useContext, useEffect, useState } from "react";
import { Card, List, Space, Input } from "antd";
import Login from "../login/login";
import { useNavigate } from "react-router-dom";
import LoaderContext from "../../context/LoaderContext";
import Loader from "../../components/Loader/Loader";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { startSetMovies } from "../../redux/actions/movies";
import { startSetActors } from "../../redux/actions/actors";

const { Meta } = Card;
const { Search } = Input;

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
  const dispatch = useAppDispatch();

  const moviesData = useAppSelector((state) => state.movies);
  const actorsData = useAppSelector((state) => state.actors);

  const { loading } = useContext(LoaderContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [open, setOpen] = useState(false);

  const [movies, setMovies]: any = useState([]);
  const [actors, setActors]: any = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const fetch = () => {
    setConfirmLoading(true);
    dispatch(startSetMovies());
    dispatch(startSetActors());
    setConfirmLoading(false);
  };

  const onSearch = (value: string) => {
    setSearchTerm(value);
    setMovies(
      moviesData.filter((data) => data.title.toLowerCase().includes(value))
    );
    setActors(
      actorsData.filter(
        (data) =>
          data.firstName.toLowerCase().includes(value) ||
          data.lastName.toLowerCase().includes(value)
      )
    );
  };

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
        extra={
          <Space direction="vertical">
            <Search
              placeholder="Search movies and actors..."
              onChange={(e) => onSearch(e.target.value)}
              style={{ width: 304 }}
              allowClear
              enterButton
            />
          </Space>
        }
      >
        <List
          loading={confirmLoading}
          grid={{ gutter: 16, column: 8 }}
          dataSource={searchTerm ? movies : moviesData}
          renderItem={(item: any) => (
            <List.Item>
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
                onClick={() => {
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
                      actorsId: item.actorsId,
                    },
                  });
                }}
              >
                <Meta
                  title={
                    <label style={{ color: "#002140" }}>{item.title}</label>
                  }
                />
                <small
                  style={{ color: "#a6aaae" }}
                >{`${item.yearOfRelease} | ${item.runningTime}`}</small>
              </Card>
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

      {searchTerm && (
        <Card
          loading={loading}
          title={
            <div style={{ fontWeight: "bolder", color: "#002140" }}>
              SEARCH ACTORS
            </div>
          }
          size="small"
          style={{
            margin: "25px",
            borderRadius: "10px",
            boxShadow: "10px 10px 5px #dee0e3",
          }}
        >
          <List
            grid={{ gutter: 16, column: 8 }}
            dataSource={searchTerm ? actors : actorsData}
            renderItem={(item: any) => (
              <List.Item>
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
                    navigate("/manage/actors/details", {
                      state: {
                        id: item.id,
                        imageUrl: item.imageUrl,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        age: item.age,
                        gender: item.gender,
                      },
                    });
                  }}
                >
                  <Meta
                    title={
                      <label
                        style={{ color: "#002140" }}
                      >{`${item.firstName} ${item.lastName}`}</label>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </Card>
      )}
    </Loader>
  );
}

export default AdminHome;
