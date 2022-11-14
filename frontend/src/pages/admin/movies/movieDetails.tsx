import React, { useEffect, useState } from "react";
import {
  Form,
  Rate,
  Card,
  Row,
  Col,
  Typography,
  List,
  Avatar,
  Button,
  Comment,
  Tooltip,
  Input,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../login/login";
import _ from "lodash";

interface IActors {
  id: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
}

interface IReviewer {
  id?: string;
  date: string;
  content: string;
  rate: number;
  userId: string;
  initialName: string;
  fullName: string;
}

interface IMovies {
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

const apiActors = require("../../../utils/api/actors");
const apiMovies = require("../../../utils/api/movies");
const apiUsers = require("../../../utils/api/users");
const apiReviewers = require("../../../utils/api/reviewers");
const common = require("../../../utils/common");

const { Paragraph, Text } = Typography;
const { TextArea } = Input;

const MovieDetails = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false)

  const [visibleReviewerDetails, setVibileReviewerDetails] = useState(false);

  const [ellipsis] = useState(true);
  const [actorList, setActorList]: any = useState([]);

  const [myReviews, setMyReviews]: any = useState([]);
  const [getAllReviewDetails, setGetAllReviewDetails]: any = useState([]);

  const [ratingPercentage, setRatingPercentage] = useState(0);

  useEffect(() => {
    fetchActors();
    fetchReviewers();
  }, []);

  const fetchActors = async () => {
    setLoading(true)
    let newObj: IActors[] = [];
    apiMovies.getMovieDetails(location.state.id).then((data: IMovies) => {
      return data.actorsId.map(async (data: any) => {
        await apiActors.getActorDetails(data).then((item: IActors) => {
          newObj.push(item);
          setActorList([...newObj]);
        });
        setLoading(false)
      });
    });
  };

  const dataActors = actorList.map((val: IActors) => ({
    age: val.age,
    firstName: val.firstName,
    gender: val.gender,
    id: val.id,
    imageUrl: val.imageUrl,
    lastName: val.lastName,
  }));

  const getInitialName = async (data: string) => {
    const details = await apiUsers.getUserDetails(data);
    return {
      firstName: details.firstName,
      lastName: details.lastName,
      init: details.firstName.charAt(0) + details.lastName.charAt(0),
    };
  };

  const fetchReviewers = async () => {
    setLoading(true)
    const token = sessionStorage.getItem("token");
    let userId = "";
    if (token) {
      userId = await apiUsers.getWhoAmI(token);
    }
    let res = await apiReviewers.getAllReviewers();
    const reviewersList: IReviewer[] = res;
    let newObj: any[] = [];
    let newObjAll: any[] = [];
    reviewersList.map(async (data: any) => {
      if (data.userId === userId && data.movieId === location.state.id) {
        newObj.push(data);
        setMyReviews(newObj);
      }
      if (data.movieId === location.state.id) {
        const initialName: any = await getInitialName(data.userId);
        newObjAll.push({
          id: data.id,
          date: data.date,
          rate: data.rate,
          fullName: `${initialName.firstName} ${initialName.lastName}`,
          content: data.content,
          userId: data.userId,
          initialName: initialName.init,
        });
        setGetAllReviewDetails(newObjAll);
        const avgRating = common.ratingAvg(newObjAll);
        setRatingPercentage(avgRating);
      }
    });
    setLoading(false)
  };

  const dataAllReviewers = getAllReviewDetails.map((val: IReviewer) => ({
    id: val.id,
    date: val.date,
    rate: val.rate,
    content: val.content,
    userId: val.userId,
    initialName: val.initialName,
    fullName: val.fullName,
  }));

  const [submitting, _] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleSubmit = async (data: { rate: string; content: string }) => {
    setLoading(true)
    const payload = {
      rate: data.rate,
      content: data.content,
      date: `${new Date().toISOString().slice(0, 10)} ${new Date()
        .toLocaleString()
        .slice(11, 19)}`,
      status: "PENDING",
      userId: props.userId,
      movieId: location.state.id,
      title: location.state.title,
    };
    let res = await apiReviewers.addReviewers(payload);
    if (res) {
      window.location.reload();
    } 
    setLoading(false)
  };

  const onClickReviewButton = () => {
    const token = sessionStorage.getItem("token");
    token ? setVibileReviewerDetails(true) : setOpenLoginModal(true);
  };

  return (
    <>
      {openLoginModal && (
        <Login open={openLoginModal} setOpen={setOpenLoginModal} />
      )}
      <Card
        title={
          <div style={{ fontWeight: "bolder", color: "#002140" }}>
            MOVIE DETAILS
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
                {location.state.title}
              </h1>
              <Paragraph
                type="secondary"
                style={{ color: "#c5c5c5" }}
                ellipsis={
                  ellipsis
                    ? { rows: 2, expandable: true, symbol: "see more" }
                    : false
                }
              >
                {location.state.description}
              </Paragraph>
              <Row justify="start">
                <Col span={4}>
                  <p>
                    <span style={{ color: "white" }}>Director: </span>
                    <span style={{ color: "#c5c5c5" }}>
                      {location.state.director}:
                    </span>
                    <br />
                    <span style={{ color: "white" }}>Duration: </span>
                    <span style={{ color: "#c5c5c5" }}>
                      {`${location.state.yearOfRelease} | ${location.state.duration}`}
                    </span>
                    <br />
                    <br />
                    <span style={{ color: "white" }}>Budget Cost: </span>
                    <span style={{ color: "#c5c5c5" }}>
                      {`$ ${location.state.budgetCost}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </span>
                  </p>
                </Col>
                <Col span={5}>
                  <span style={{ color: "white" }}>Rating Avg: </span>
                  <span style={{ color: "#c5c5c5" }}>
                    {ratingPercentage}/5 | {getAllReviewDetails.length} votes
                    <Rate allowHalf value={ratingPercentage} disabled />
                  </span>
                </Col>
              </Row>
              <Col>
                <span style={{ color: "white" }}> Actors: </span>
                <List
                  style={{ marginTop: "10px" }}
                  grid={{ gutter: 16, column: 10 }}
                  dataSource={dataActors}
                  loading={loading}
                  renderItem={(item: any) => (
                    <List.Item>
                      <Card
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: "7px",
                        }}
                        onClick={() =>
                          navigate("/manage/actors/details", {
                            state: {
                              id: item.id,
                              imageUrl: item.imageUrl,
                              firstName: item.firstName,
                              lastName: item.lastName,
                              age: item.age,
                              gender: item.gender,
                            },
                          })
                        }
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
                            marginTop: "-12px",
                          }}
                        >
                          {`${item.firstName} ${item.lastName}`}
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
                <br /> <br /> <br />
                {myReviews.length && (
                  <span style={{ color: "white", marginTop: "60px" }}>
                    My Review: &nbsp;
                    <Text
                      style={{
                        color: `${
                          myReviews[0].status === "PENDING"
                            ? "#ff4646"
                            : "#4de31c"
                        }`,
                        fontWeight: "bolder",
                      }}
                    >
                      {myReviews[0].status}
                    </Text>
                    <br />
                    <Rate disabled value={myReviews[0].rate} />
                    <Paragraph
                      type="secondary"
                      style={{ color: "#c5c5c5" }}
                      ellipsis={
                        ellipsis
                          ? { rows: 2, expandable: true, symbol: "see more" }
                          : false
                      }
                    >
                      {myReviews[0].content}
                    </Paragraph>
                  </span>
                )}
                {props.roleId !== 1 && !myReviews.length && (
                  <span style={{ color: "white", marginTop: "60px" }}>
                    Review:
                    <br />
                    <Tooltip title="Vote">
                      <Button
                        size="small"
                        type="primary"
                        style={{
                          color: "white",

                          marginTop: "10px",
                          borderRadius: "25px",
                        }}
                        icon={<FileAddOutlined />}
                        onClick={onClickReviewButton}
                      >
                        Add Review
                      </Button>
                    </Tooltip>
                  </span>
                )}
                {visibleReviewerDetails ? (
                  <Comment
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <span style={{ color: "white" }}>
                        &nbsp; VOTE (1-5) : &nbsp;
                        <Form
                          name="basic"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}
                          initialValues={{ remember: true }}
                          onFinish={handleSubmit}
                          autoComplete="off"
                        >
                          <Form.Item
                            name="rate"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Rate is required.",
                              },
                            ]}
                          >
                            <Rate />
                          </Form.Item>
                          <Form.Item
                            name="content"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Review/Comment is required!",
                              },
                            ]}
                          >
                            <TextArea
                              showCount
                              maxLength={500}
                              rows={4}
                              style={{
                                borderColor: "black",
                                width:"100%",
                              }}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              loading={submitting}
                              type="primary"
                            >
                              Add Comment
                            </Button>
                          </Form.Item>
                        </Form>
                      </span>
                    }
                  />
                ) : (
                  <></>
                )}
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
        <Card
          title={
            <div style={{ fontWeight: "bolder", color: "#002140" }}>
              REVIEWS / COMMENTS
            </div>
          }
          size="small"
          style={{
            marginTop: "25px",
            marginRight: "12px",
            borderRadius: "15px",
            boxShadow: "10px 10px 5px #dee0e3",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={dataAllReviewers}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        marginTop: "7px",
                        backgroundColor: `darkgreen`,
                      }}
                    >
                      {item.initialName}
                    </Avatar>
                  }
                  title={
                    <span>
                      {`${item.fullName}`}&nbsp;&nbsp;
                      <Rate defaultValue={item.rate} disabled />
                      <br />
                      <p
                        style={{
                          fontSize: "10px",
                          marginTop: "0px",
                          color: "gray",
                        }}
                      >
                        {item.date}
                      </p>
                    </span>
                  }
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>
      </Card>
    </>
  );
};

export default MovieDetails;
