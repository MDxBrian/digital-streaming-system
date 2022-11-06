import {
  UserOutlined,
  HomeFilled,
  SwitcherFilled,
  VideoCameraFilled,
  StarFilled,
  SettingOutlined 
} from "@ant-design/icons";

export const SideMenuData: any = [
  {
    key: "0",
    icon: <HomeFilled />,
    label: <b>HOME</b>,
    path: "/",
    page: "home",
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
        icon: <StarFilled />,
        label: <b>REVIEWS</b>,
        path: "/manage/movies/review",
        page: "MOVIE REVIEWS",
      },
      {
        key: "4",
        icon: <UserOutlined />,
        label: <b>ACTORS</b>,
        path: "/manage/actors",
        page: "ACTORS",
      },
      {
        key: "5",
        icon: <SettingOutlined />,
        label: <b>USERS</b>,
        path: "/manage/users",
        page: "USERS",
      },
    ],
  },
];
