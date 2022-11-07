import {
  DesktopOutlined,
  FileOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Layout,
  Card,
  Col,
  Row,
  Button,
  Dropdown,
  message,
  Avatar,
  Tooltip,
  Space,
  Menu,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  redirect,
} from "react-router-dom";
import SideMenu from "./components/Layout/sideMenu/index";
import Actors from "./pages/admin/actors/actors";
import ActorsAdd from "./pages/admin/actors/actorsAdd";
import ActorsEdit from "./pages/admin/actors/actorsEdit";
// import Header from "./components/Layout/Header/header";
import AdminHome from "./pages/admin/home";
import MovieDetails from "./pages/admin/movies/movieDetails";
import Movies from "./pages/admin/movies/movies";
import MoviesAdd from "./pages/admin/movies/moviesAdd";
import MoviesReview from "./pages/admin/movies/moviesReview";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import RegisterSuccess from "./pages/login/registerSuccess";
import PrivateRoute from "./pages/privateRoute";

import { DownOutlined, UserOutlined } from "@ant-design/icons";

const utils = require("./utils/common");
const apiUsers = require("./utils/api/users");

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const onMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const items: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1",
    icon: <TeamOutlined />,
  },
];

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "PROFILE SETTING",
        icon: <SettingOutlined />,
      },
      {
        key: "2",
        danger: true,
        label: "SIGN OUT",
        icon: <LogoutOutlined />,
        onClick: () => {
          sessionStorage.removeItem("token");
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/";
        },
      },
    ]}
  />
);

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const menuProps = {
  items,
  onClick: handleMenuClick,
};

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
  const [roleId, setRoleId] = useState(2)
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [loading, setLoading] = useState(false);
  const [isVisibleSideMenu, setIsVisibileSideMenu] = useState(false);
  const [isVisibleAvatar, setIsVisibileAvatar] = useState(false);
  const [getName, setName] = useState("");
  const [isVisibleSiginInButton, setIsVisibleSiginInButton] = useState(true);
  const logginUserId = sessionStorage.getItem("token");

  useEffect(() => {
    if (logginUserId) {
      fetchUserDetails();
    } else {
      setIsVisibleSiginInButton(true);
    }
  }, []);

  const fetchUserDetails = async () => {
    const res = await apiUsers.getWhoAmI(logginUserId);
    if (!res) {
      setIsVisibleSiginInButton(true);
      setIsVisibileAvatar(false);
    }
    const details = await apiUsers.getUserDetails(res);
    setName(details.firstName.charAt(0) + details.lastName.charAt(0));
    setIsVisibileAvatar(true);
    setIsVisibleSiginInButton(false);
    
    if(
      details.roleId === 1) {
        setIsVisibileSideMenu(true)
        setRoleId(1)
      } else {
        setIsVisibileSideMenu(false);
        setRoleId(2)
      }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const items = [
    { label: "item 1", key: "item-1" }, // remember to pass the key prop
    { label: "item 2", key: "item-2" },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {isVisibleSideMenu && <SideMenu />}
        {/* <Header /> */}
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              <Col
                span={12}
                style={{
                  color: "#f0f2f5",
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
                {isVisibleSiginInButton && (
                  <Button type="primary" onClick={showModal} shape="round">
                    Sign In
                  </Button>
                )}

                {isVisibleAvatar && (
                  <>
                    <Dropdown
                      overlay={menu}
                      trigger={["click"]}
                      placement="bottomRight"
                      arrow
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Avatar
                            size={38}
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                              boxShadow: "2px 2px 5px darkblue",
                            }}
                          >
                            {getName}
                          </Avatar>
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </>
                )}

                {open && <Login open={open} setOpen={setOpen} />}
              </Col>
            </Row>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/register" element={<Register />} />

              <Route path="/manage/movies/details" element={<MovieDetails roleId={roleId}/>} />
              <Route
                path="register/success"
                element={<RegisterSuccess />}
              ></Route>
              <Route path="*" element={<PrivateRoute />} />
              <Route element={<PrivateRoute />}>
                <Route path="/manage/users" element={<ActorsEdit />} />
                <Route path="/manage/movies" element={<Movies />} />
                <Route path="/manage/movies/add" element={<MoviesAdd />} />
                <Route
                  path="/manage/movies/review"
                  element={<MoviesReview />}
                />
                <Route path="/manage/actors" element={<Actors />} />
                <Route path="/manage/actors/add" element={<ActorsAdd />} />
                <Route path="/manage/actors/edit" element={<ActorsEdit />} />
              </Route>
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Created By Mark Brian @ 2022
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
