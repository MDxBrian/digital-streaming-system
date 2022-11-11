import { useEffect, useState } from "react";
import { SideMenuData } from "./SideMenuData";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import style from "./SideMenu.module.scss";
const { Sider } = Layout;

interface ISideMenu {
  key: string;
  icon: JSX.Element;
  label: JSX.Element;
  path?: string;
  children?: object[];
  page: string;
}

const SideMenu = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState<any | null>(null);
  const [item, setItem] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleContentPage = (e: any) => {
    SideMenuData.map((data: ISideMenu, index: number) => {
      if (e.key === SideMenuData[index].key) {
        setKey(e.key);
        navigate(`${data.path}`);
      }
      if (SideMenuData[index].children) {
        SideMenuData[index].children?.map((data: any) => {
          if (e.key === data.key) {
            setKey(data.key);
            navigate(`${data.path}`);
          }
        });
      }
    });
  };

  useEffect(() => {
    let items: any = [];
    SideMenuData.map((data: ISideMenu) => {
      items.push(data);
      if (!data.path) {
        if (data.children) {
          data.children.map((data: any) => {
            if (window.location.pathname === data.path) {
              setKey(data.key);
            }
          });
        }
      } else {
        setKey(data.key);
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
      <div className={style.header} />
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
