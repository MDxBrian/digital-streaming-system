import {
  UserOutlined,
  HomeFilled,
  SwitcherFilled,
  VideoCameraFilled,
} from "@ant-design/icons";

export const SideMenuData: any = [
  {
    key: "0",
    icon: <HomeFilled />,
    label: <b>DASHBOARD</b>,
    path: "/",
    page: "dashboard",
  },
  {
    key: "1",
    icon: <SwitcherFilled />,
    label: <b>MANAGE</b>,
    page: "movies",
    children: [
      {
        key: "2",
        icon: <VideoCameraFilled />,
        label: <b>MOVIES</b>,
        path: "/manage/movies",
        page: "MOVIES",
      },
      {
        key: "3",
        icon: <UserOutlined />,
        label: <b>ACTORS</b>,
        path: "/manage/actors",
        page: "ACTORS",
      },
    ],
  },
];
