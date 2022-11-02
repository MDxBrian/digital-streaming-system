import { useState } from "react";
import { SideMenuData } from "./sideMenuData";
import { useNavigate, useLocation } from "react-router-dom";
import "./sideMenu.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Radio, Modal, MenuProps } from "antd";
import logo from "../../../assets/images/logo.jpg";

const { Footer, Sider } = Layout;

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

const items: MenuItem[] = [
  
  getItem("DASHBOARD", "1"),
  getItem("ADMINISTRATOR", "subs", null, [
    getItem("PROFILE", "2"),
    getItem("LOGOUT", "3"),
  ]),
  getItem("MANAGE", "sub1", <UserOutlined />, [
    getItem("MOVIES", "2"),
    getItem("ACTORS", "3"),
    getItem("USERS", "4"),
  ]),
  getItem("PENDING", "sub2", <UserOutlined />, [
    getItem("MOVIE REVIEWS", "5"),
    getItem("USERS", "6"),
  ]),
];

const SideMenu = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [key, setKey] = useState();
  const [item, setItem] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  console.log(SideMenuData);
  // const handleContentPage = (e) => {
  //   SideMenuData.map((val, i) => {
  //     if (e.key === SideMenuData[i].key) {
  //       setKey(SideMenuData[i].key);
  //       navigate(`${val.path}${search}`);
  //     }

  //     return {};
  //   });
  // };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="header" style={{ marginBottom: "20px", backgroundColor: "#002140", height: "60px"}}>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      ></Menu>
      <Menu selectedKeys={key} items={item} />
    </Sider>
  );
};

export default SideMenu;
