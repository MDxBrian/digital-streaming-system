import React from "react";
import {
  UserOutlined,
  HomeFilled,
} from "@ant-design/icons";
// import { BsChevronRight } from "react-icons/bs";
export const SideMenuData = [
  {
    key: "0",
    icon: <HomeFilled />,
    label: (
      <b>
        HOME
        {/* <span className="arrow-icon">
          <BsChevronRight />
        </span> */}
      </b>
    ),
    path: "qcissuance/home",
    page: "home",
  },
  {
    key: "1",
    icon: <UserOutlined />,
    label: (
      <b>
        ACCOUNT SETTING{" "}
        {/* <span className="arrow-icon">
          <BsChevronRight />
        </span> */}
      </b>
    ),
    path: "qcissuance/accountsetting",
    page: "account setting page",
  },
];
