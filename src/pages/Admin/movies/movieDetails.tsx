import React, { useEffect, useState } from "react";
import {
  Form,
  Rate,
  Image,
  Card,
  Table,
  Row,
  Col,
  Typography,
  List,
  Badge,
  Avatar,
  Button,
  Comment,
  Tooltip,
  Skeleton,
  Input,
} from "antd";
import moment from "moment";
import { FileAddOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../login/login";
import Register from "../../login/register";

var arrColor = [
  "crimson",
  "cadetblue",
  "blueviolet",
  "darkslateblue",
  "darkmagenta",
  "brown",
  "darkolivegreen",
  "darkgoldenrod",
];

const apiActors = require("../../../utils/api/actors");
const apiMovies = require("../../../utils/api/movies");
const apiUsers = require("../../../utils/api/users");
const apiReviewers = require("../../../utils/api/reviewers");

const { Meta } = Card;
const { Paragraph, Text } = Typography;
const { TextArea } = Input;
interface DataType {
  imageUrl: string;
  fullname: string;
  firstName: string;
  lastName: string;
  title: string;
}
interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

interface DataType {
  id?: string;
  date: string;
  content: string;
  rate: number;
  userId: string;
  initialName: string;
  fullName: string;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}
interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        style={{
          borderColor: "black",
          background:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,34,68,1) 5%)",
          color: "#c5c5c5",
        }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const MovieDetails = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleReviewerDetails, setVibileReviewerDetails] = useState(false);

  const [ellipsis, setEllipsis] = useState(true);
  const [image, setImage] = useState("");
  const [actorList, setActorList]: any = useState([]);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  const [myReviews, setMyReviews]: any = useState([]);
  const [getAllReviewDetails, setGetAllReviewDetails]: any = useState([]);

  useEffect(() => {
    fetchActorsImages();
    fetchReviewers();
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    // setList(
    //     // data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    //   );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const fetchActorsImages = async () => {
    let res = await apiMovies.getMovieDetails(location.state.id);
    const actorsId: string[] = res.actorsId;
    let newObj: any[] = [];
    actorsId.map(async (data: any) => {
      let res = await apiActors.getActorDetails(data);
      newObj.push(res);
      setActorList(newObj);
    });
  };

  const dataActors = actorList.map((val: DataType) => ({
    id: val.id,
    title: val.title,
    imageUrl: val.imageUrl,
    fullname: val.firstName + " " + val.lastName,
  }));

  const getInitialName = async (data: string) => {
    const details = await apiUsers.getUserDetails(data);
    return details.firstName.charAt(0) + details.lastName.charAt(0);
  };

  const fetchReviewers = async () => {
    let userId = await apiUsers.getWhoAmI(sessionStorage.getItem("token"));
    let res = await apiReviewers.getAllReviwers();
    const reviewersList: string[] = res;
    let newObj: any[] = [];
    let newObjAll: any[] = [];
    reviewersList.map(async (data: any) => {
      if (data.userId == userId && data.movieId == location.state.id) {
        newObj.push(data);
      }
      if (data.movieId == location.state.id) {
        const initialName: string = await getInitialName(data.userId);
        console.log(initialName);
        newObjAll.push({
          id: data.id,
          date: data.date,
          rate: data.rate,
          fullName: data.rate,
          content: data.content,
          userId: data.userId,
          initialName: initialName,
        });
      }
    });
    setMyReviews(newObj);
    setGetAllReviewDetails(newObjAll);
  };

  const dataAllReviewers = getAllReviewDetails.map((val: DataType) => ({
    id: val.id,
    date: val.date,
    rate: val.rate,
    content: val.content,
    userId: val.userId,
    initialName: val.initialName,
    fullName: val.fullName,
  }));

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleSubmit = async () => {
    const payload = {
      rate: rate,
      content: value,
      date: `${new Date().toISOString().slice(0, 10)} ${new Date()
        .toLocaleString()
        .slice(11, 19)}`,
      status: "PENDING",
      userId: props.userId,
      movieId: location.state.id,
    };
    let res = await apiReviewers.addReviewers(payload);
    if (res) {
      window.location.reload();
    } else {
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onClickReviewButton = () => {
    const token = sessionStorage.getItem("token");
    token ? setVibileReviewerDetails(true) : setOpenLoginModal(true);
  };

  const [rate, setRate] = useState(0);

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
                      {location.state.duration}
                    </span>
                    <br />
                    <span style={{ color: "white" }}>Budget Cost: </span>
                    <span style={{ color: "#c5c5c5" }}>
                      {location.state.budgetCost}:
                    </span>
                  </p>
                </Col>
                <Col span={5}>
                  <span style={{ color: "white" }}>Rating Avg: </span>
                  <span style={{ color: "#c5c5c5" }}>
                    7.85 | 9 votes
                    <Rate allowHalf defaultValue={3.7} disabled />
                  </span>
                </Col>
              </Row>
              <Col>
                <span style={{ color: "white" }}> Actors: </span>
                <List
                  style={{ marginTop: "10px" }}
                  grid={{ gutter: 16, column: 10 }}
                  dataSource={dataActors}
                  renderItem={(item: any) => (
                    <List.Item>
                      <Card
                        style={{ width: 100, height: 100, borderRadius: "7px" }}
                        cover={
                          <img
                            style={{
                              borderRadius: "7px",
                              width: "100px",
                              height: "130px",
                            }}
                            alt="example"
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
                          {item.fullname}
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
                <br /> <br /> <br />
                {/* Checking the role id and if review has already made */}
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
                        {" "}
                        VOTE (1-5) : &nbsp;
                        <Rate onChange={(data) => setRate(data)} />
                        <Editor
                          onChange={handleChange}
                          onSubmit={handleSubmit}
                          submitting={submitting}
                          value={value}
                        />
                      </span>
                    }
                  />
                ) : (
                  <></>
                )}
              </Col>
            </Col>
            <Col span={6} pull={18}>
              <Badge.Ribbon
                style={{ marginTop: "5px" }}
                text={location.state.yearOfRelease}
              >
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
              </Badge.Ribbon>
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
            // className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={dataAllReviewers}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        marginTop: "7px",
                        backgroundColor: `${
                          arrColor[Math.floor(Math.random() * arrColor.length)]
                        }`,
                      }}
                    >
                      {item.initialName}
                    </Avatar>
                  }
                  title={
                    <span>
                      {item.initialName}
                      <Rate defaultValue={item.rate} disabled />
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
