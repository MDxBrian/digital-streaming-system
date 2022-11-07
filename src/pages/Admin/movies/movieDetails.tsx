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

const apiActors = require("../../../utils/api/actors");
const apiMovies = require("../../../utils/api/movies");

const { Meta } = Card;
const { Paragraph, Text } = Typography;
const { TextArea } = Input;
interface DataType {
  id: string;
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
      <TextArea rows={4} onChange={onChange} value={value} />
      <span style={{ color: "white" }}> VOTE (1-5): </span> <Rate />
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
  const [visibleReviewerButton, setVibileReviewerButton] = useState(false);
  const [visibleReviewerDetails, setVibileReviewerDetails] = useState(false);

  const [ellipsis, setEllipsis] = useState(true);
  const [image, setImage] = useState("");
  const [actorList, setActorList]: any = useState([]);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetchActorsImages();
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

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
          datetime: moment("2016-11-22").fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onClickReviewButton = () => {
    const token = sessionStorage.getItem("token");
    token ? setVibileReviewerDetails(true) : setOpenLoginModal(true);
  };
  console.log(props.roleId);

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
                    <Rate allowHalf defaultValue={3.7} disabled/>
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
                {props.roleId !== 1 && (
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
                      <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                      />
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
          style={{
            marginTop: "25px",
            marginRight: "12px",
            borderRadius: "15px",
          }}
        >
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">edit</a>,
                  <a key="list-loadmore-more">more</a>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      >
                        U
                      </Avatar>
                    }
                    title={<a href="https://ant.design">{item.name?.last}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Card>
    </>
  );
};

export default MovieDetails;
