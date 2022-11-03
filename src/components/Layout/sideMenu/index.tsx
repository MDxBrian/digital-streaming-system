import { useEffect, useState } from "react";
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
import { Layout, Menu } from "antd";
import logo from "../../../assets/images/logo.jpg";

const { Sider } = Layout;

const SideMenu = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [key, setKey] = useState();
  const [item, setItem] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleContentPage = (e: any) => {
    SideMenuData.map((val: any, i: number) => {
      if (e.key === SideMenuData[i].key) {
        setKey(SideMenuData[i].key);
        navigate(`${val.path}${search}`);
      }
      if (SideMenuData[i].children) {
        SideMenuData[i].children.map((val: any) => {
          if (e.key === val.key) {
            setKey(val.key);
            navigate(`${val.path}${search}`);
          }
        });
      }
      return {};
    });
  };

  useEffect(() => {
    let items: any = [];
    SideMenuData.map((val: any) => {
      items.push(val);
      if (!val.path) {
        if (val.children) {
          val.children.map((val: any) => {
            if (window.location.pathname === val.path) {
              setKey(val.key);
            }
          });
        }
      } else {
        setKey(val.key);
      }
      return {};
    });
    setItem(items);
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        className="header"
        style={{
          marginBottom: "20px",
          backgroundColor: "#002140",
          height: "60px",
        }}
      ></div>
      <Menu
        theme="dark"
        mode="inline"
        items={item}
        selectedKeys={key}
        defaultOpenKeys={["1"]}
        onClick={handleContentPage}
      ></Menu>
    </Sider>
  );
};

export default SideMenu;
