import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Modal, Col, Row, Button, Form, Input, Checkbox } from "antd";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SideMenu from "./components/Layout/sideMenu/index";
import Actors from "./pages/admin/actors/actors";
import ActorsAdd from "./pages/admin/actors/actorsAdd";
import ActorsEdit from "./pages/admin/actors/actorsEdit";
// import Header from "./components/Layout/Header/header";
import AdminHome from "./pages/admin/home";
import Movies from "./pages/admin/movies/movies";
import MoviesAdd from "./pages/admin/movies/moviesAdd";
import Login from "./pages/login/login";

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  // const [collapsed, setCollapsed] = useState(false);

  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <SideMenu />
        {/* <Header /> */}
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              <Col
                span={12}
                style={{
                  color: "green",
                  fontFamily: "initial",
                  fontSize: "26px",
                  paddingLeft: "20px",
                }}
              >
                <Row>DIGITAL STREAMING SYSTEM</Row>
              </Col>
              <Col
                span={12}
                style={{
                  textAlign: "right",
                  color: "#f84464",
                  paddingRight: "20px",
                }}
              >
                <Button
                  type="dashed"
                  icon={<SearchOutlined />}
                  size="large"
                  style={{
                    textAlign: "right",
                    marginRight: "20px",
                    color: "gray",
                  }}
                >
                  Search for Movies and Actors
                </Button>
                <Button type="primary" onClick={showModal} shape="round">
                  Sign In
                </Button>
                {open && <Login open={open} setOpen={setOpen}/> }
                
              </Col>
            </Row>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/manage/users" element={<ActorsEdit />} />
              <Route path="/manage/movies" element={<Movies />} />
              <Route path="/manage/movies/add" element={<MoviesAdd />} />
              <Route path="/manage/movies/review" element={<MoviesAdd />} />
              <Route path="/manage/actors" element={<Actors />} />
              <Route path="/manage/actors/add" element={<ActorsAdd />} />
              <Route path="/manage/actors/edit" element={<ActorsEdit />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Created By Mark Brian @ Collabera 2022
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
