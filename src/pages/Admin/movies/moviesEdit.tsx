import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Space,
  Card,
  Button,
  Typography,
  Row,
  Col,
  Select,
  InputNumber,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const apiActors = require("../../../utils/api/actors");
const apiMovies = require("../../../utils/api/movies");

const { Text } = Typography;
const { TextArea } = Input;

interface ItemProps {
  label: string;
  value: string;
}

const MoviesAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const options: ItemProps[] = [];
  useEffect(() => {
    fetchActorList();
  }, []);

  const [data, setData]: any[] = useState([]);
  const [value, setValue]: any = useState([]);

  const fetchActorList = async () => {
    let res = await apiActors.getAllActors();
    res.map((val: { id: string; firstName: string; lastName: string }) => {
      options.push({
        label: `${val.firstName} ${val.lastName}`,
        value: `${val.id}`,
      });
      setData(options);
    });
    setValue(location.state.actorsId);
  };

  const onSubmit = async (values: any) => {
    const payload = {
      id: location.state.id,
      title: values.title,
      imageUrl: values.imageUrl,
      budgetCost: values.cost,
      yearOfRelease: values.yearRelease,
      runningTime: values.runningTime,
      director: values.director,
      description: values.description,
      actorsId: value,
    };

    let res = await apiMovies.updateMovieDetails(payload);
    if (res) {
      return navigate("/manage/movies/details", {
        state: {
          id: payload.id,
          title: payload.title,
          imageUrl: payload.imageUrl,
          director: payload.director,
          budgetCost: payload.budgetCost,
          description: payload.description,
          duration: payload.runningTime,
          yearOfRelease: payload.yearOfRelease,
        },
      });
    }
  };
  return (
    <Card
      title="Edit Movies"
      size="small"
      style={{ margin: "25px", boxShadow: "10px 10px 5px #dee0e3" }}
    >
      <Form
        style={{ margin: "25px" }}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Row>
          <Col span={14}>
            <Form.Item
              label="Movie Title"
              name="title"
              initialValue={location.state.title}
              rules={[
                {
                  required: true,
                  message: "Movie title is required!",
                },
              ]}
            >
              <Input style={{ fontWeight: "bold" }} />
            </Form.Item>
            <Form.Item label="Choose an Actor" name="actor">
              <Input.Group compact>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={location.state.actorsId}
                    onChange={(newValue: any[]) => {
                      console.log(newValue);
                      setValue(newValue);
                    }}
                    options={data}
                    maxTagCount="responsive"
                  />
                </Space>
                <br />
                <Text type="secondary">
                  If actors is not exist you can &nbsp;
                  <Link to={"/manage/actors/add"}>add actor here</Link>.
                </Text>
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="imageUrl"
              rules={[
                {
                  required: true,
                  type: "url",
                  message: "Image URL is required!",
                },
              ]}
              initialValue={location.state.imageUrl}
            >
              <Input />
            </Form.Item>

            <Form.Item
              initialValue={location.state.budgetCost}
              label="Budget Cost"
              name="cost"
              rules={[
                {
                  required: true,
                  message: "Budget cost is required!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                min={0}
                max={99999999999999}
                step="0.01"
                parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "50%" }}
              />
            </Form.Item>
            <Form.Item
              initialValue={location.state.yearOfRelease}
              label="Year of Release"
              name="yearRelease"
              rules={[
                {
                  required: true,
                  message: "Year of release is required!",
                },
              ]}
            >
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item
              label="Duration"
              name="runningTime"
              initialValue={location.state.runningTime}
              rules={[
                {
                  required: true,
                  message: "Duration is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Director"
              name="director"
              initialValue={location.state.director}
              rules={[
                {
                  required: true,
                  message: "Director. is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              initialValue={location.state.description}
            >
              <TextArea
                rows={4}
                placeholder="Max character is 500"
                maxLength={500}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button type="primary" htmlType="submit">
                UPDATE
              </Button>
            </Form.Item>
          </Col>
          <Col span={1}>
            <img
              style={{
                border: "3px solid #f5f5f5",
                backgroundRepeat: "no-repeat",
                backgroundSize: "470px 600px",
                backgroundImage: `url("data:image/png;base64,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")`,
              }}
              width={470}
              height={600}
              src={location.state.imageUrl}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default MoviesAdd;
