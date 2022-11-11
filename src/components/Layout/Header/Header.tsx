import { Link } from "react-router-dom";
import { HomeOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Col, Row, Button, Dropdown, Avatar, Space, Menu } from "antd";
import Login from "../../../pages/login/login";
import styles from "../Header/Header.module.scss";
const { Header } = Layout;

const menu: JSX.Element = (
  <Menu
    items={[
      {
        key: "1",
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

export interface IModalProps {
  name: string;
  setName: (name: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isVisibleAvatar: boolean;
  setIsVisibileAvatar: (isVisibleAvatar: boolean) => void;
  isVisibleSiginInButton: boolean;
  setIsVisibleSiginInButton: (isVisibleSiginInButton: boolean) => void;
}

const Headers = ({
  name,
  open,
  setOpen,
  isVisibleAvatar,
  isVisibleSiginInButton,
}: IModalProps) => {
  const showModal = () => {
    setOpen(true);
  };
  return (
    <Header className="site-layout-background">
      <Row>
        <Col span={12}>
          <h1 className={styles.title}>DIGITAL STREAMING SYSTEM</h1>
        </Col>
        <Col span={12} className={styles.colRight}>
          <Link to="/" type="ghost" className={styles.home}>
            <HomeOutlined /> HOME
          </Link>
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
                    <Avatar size={30} className={styles.avatar}>
                      {name}
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
  );
};

export default Headers;
