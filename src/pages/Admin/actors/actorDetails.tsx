import { useEffect, useState } from "react";
import { Card, Row, Col, List } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const apiMovies = require("../../../utils/api/movies");

interface IMovies {
  id: string;
  imageUrl: string;
  title: string;
  director: string;
  budgetCost: number;
  description: string;
  runningTime: string;
  yearOfRelease: string;
  duration: string;
}

const ActorDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [movieList, setMovieList]: any = useState([]);

  useEffect(() => {
    fetchMoviesAlongActors();
  }, []);

  const fetchMoviesAlongActors = async () => {
    let res = await apiMovies.getAllMovies();
    let newObj: any[] = [];
    res.map((data: any) => {
      if (data.actorsId.length) {
        data.actorsId.map((val: string) => {
          return val === location.state.id ? newObj.push(data) : null;
        });
      }
    });
    setMovieList(newObj);
  };

  const dataMovies = movieList.map((val: IMovies) => ({
    id: val.id,
    title: val.title,
    imageUrl: val.imageUrl,
    director: val.director,
    budgetCost: val.budgetCost,
    description: val.description,
    runningTime: val.runningTime,
    yearOfRelease: val.yearOfRelease,
  }));

  return (
    <>
      <Card
        title={
          <div style={{ fontWeight: "bolder", color: "#002140" }}>
            ACTOR DETAILS
          </div>
        }
        size="small"
        style={{
          margin: "25px",
          borderRadius: "10px",
          boxShadow: "10px 10px 5px #dee0e3",
        }}
      >
        <Card
          size="small"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,0,0,1) 3%, rgba(0,34,68,1) 100%)",
            marginRight: "12px",
            boxShadow: "10px 10px 5px #dee0e3",
          }}
        >
          <Row>
            <Col
              span={18}
              push={6}
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <h1
                style={{
                  fontWeight: "lighter",
                  fontSize: "42px",
                  color: "#ffff",
                  marginTop: "25px",
                }}
              >
                {location.state.firstName}&nbsp;{location.state.lastName}
              </h1>
              <Row justify="start">
                <Col span={4}>
                  <p>
                    <span style={{ color: "white" }}>GENDER: </span>
                    <span style={{ color: "#c5c5c5" }}>
                      {" "}
                      {location.state.gender}
                    </span>
                    <br />
                    <span style={{ color: "white" }}>AGE: </span>
                    <span style={{ color: "#c5c5c5" }}>
                      {location.state.age}
                    </span>
                    <br />
                  </p>
                </Col>
              </Row>
              <Col style={{ marginTop: "1rem" }}>
                <span style={{ color: "white" }}> CASTING MOVIES: </span>
                <List
                  style={{ marginTop: "10px" }}
                  grid={{ gutter: 16, column: 10 }}
                  dataSource={dataMovies}
                  renderItem={(item: any) => (
                    <List.Item>
                      <Card
                        hoverable
                        style={{ width: 100, height: 100, borderRadius: "7px" }}
                        onClick={async () => {
                          navigate("/manage/movies/details", {
                            state: {
                              id: item.id,
                              title: item.title,
                              imageUrl: item.imageUrl,
                              director: item.director,
                              budgetCost: item.budgetCost,
                              description: item.description,
                              yearOfRelease: item.yearOfRelease,
                              duration: item.runningTime,
                            },
                          });
                        }}
                        cover={
                          <img
                            style={{
                              borderRadius: "7px",
                              width: "100px",
                              height: "130px",
                            }}
                            src={item.imageUrl}
                          />
                        }
                      >
                        <div
                          style={{
                            color: "#c5c5c5",
                            fontSize: "9px",
                            textAlign: "center",
                          }}
                        >
                          {item.title}
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </Col>
            </Col>
            <Col span={6} pull={18}>
              <img
                src={location.state.imageUrl}
                style={{
                  width: "370px",
                  height: "500px",
                  margin: "25px",
                  borderRadius: "10px",
                  boxShadow: "10px 10px 5px black",
                }}
              />
            </Col>
          </Row>
        </Card>
      </Card>
    </>
  );
};

export default ActorDetails;
