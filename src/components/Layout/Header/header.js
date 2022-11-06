import { useContext, useEffect, useState } from "react";
import { Dropdown, Row, Col, Button, Menu, Modal, Radio } from "antd";
import menuIcon from "../../../assets/images/headers/menu.png";
import { SettingFilled } from "@ant-design/icons";
import "./header.css";
const Header = () => {
  return (
    <div
      className="site-layout-background"
      style={{ position: "fixed", width: "100%" }}
    >
      <h1 style={{color:"#f0f2f5"}}>DIGITAL STREAM SYSTEM
      </h1>
    </div>
  );
};

export default Header;
