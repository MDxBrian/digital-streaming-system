import { useEffect, useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { checkUsers } from "./utils/common";
import SideMenu from "./components/Layout/SideMenu/SideMenu";
import Actors from "./pages/admin/actors/actors";
import ActorsAdd from "./pages/admin/actors/actorsAdd";
import ActorsEdit from "./pages/admin/actors/actorsEdit";
import AdminHome from "./pages/admin/home";
import MovieDetails from "./pages/admin/movies/movieDetails";
import Movies from "./pages/admin/movies/movies";
import MoviesAdd from "./pages/admin/movies/moviesAdd";
import MoviesReview from "./pages/admin/movies/moviesReview";
import Register from "./pages/register/register";
import RegisterSuccess from "./pages/register/registerSuccess";
import PrivateRoute from "./pages/login/privateRoute";
import MoviesEdit from "./pages/admin/movies/moviesEdit";
import ActorDetails from "./pages/admin/actors/actorDetails";
import Users from "./pages/admin/users/users";
import UsersEdit from "./pages/admin/users/usersEdit";
import Headers from "./components/Layout/Header/Headers";

const apiUsers = require("./utils/api/users");

const { Content, Footer } = Layout;

const App = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [roleId, setRoleId] = useState(2);
  const [open, setOpen] = useState(false);
  const [isVisibleSideMenu, setIsVisibileSideMenu] = useState(false);
  const [isVisibleAvatar, setIsVisibileAvatar] = useState(false);
  const [isVisibleSiginInButton, setIsVisibleSiginInButton] = useState(true);

  const logginUserId = sessionStorage.getItem("token");

  useEffect(() => {
    /*
     * Checking if 0 length users from database and created the default root admin user.
     * @param {email:"admin@root.com", password:"root"}
     */
    checkUsers();
    logginUserId ? fetchUserDetails() : setIsVisibleSiginInButton(true);
  }, []);

  const fetchUserDetails = async () => {
    const res = await apiUsers.getWhoAmI(logginUserId);

    if (!res) {
      setIsVisibleSiginInButton(true);
      setIsVisibileAvatar(false);
    }

    const details = await apiUsers.getUserDetails(res);
    setUserId(details.id);
    setName(details.firstName.charAt(0) + details.lastName.charAt(0));
    setIsVisibileAvatar(true);
    setIsVisibleSiginInButton(false);

    if (details.roleId === 1) {
      setIsVisibileSideMenu(true);
      setRoleId(1);
    } else {
      setIsVisibileSideMenu(false);
      setRoleId(2);
    }
  };

  return (
    <div className="app">
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          {isVisibleSideMenu && <SideMenu />}
          <Layout className="site-layout">
            <Headers
              name={name}
              open={open}
              isVisibleAvatar={isVisibleAvatar}
              isVisibleSiginInButton={isVisibleSiginInButton}
              setOpen={setOpen}
              setName={setName}
              setIsVisibileAvatar={setIsVisibileAvatar}
              setIsVisibleSiginInButton={setIsVisibleSiginInButton}
            />
            <Content>
              <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/manage/movies/details"
                  element={<MovieDetails roleId={roleId} userId={userId} />}
                />
                <Route path="register/success" element={<RegisterSuccess />} />
                <Route path="*" element={<AdminHome />} />
                <Route
                  path="/manage/actors/details"
                  element={<ActorDetails />}
                />
                <Route element={<PrivateRoute />}>
                  <Route path="/manage/movies" element={<Movies />} />
                  <Route path="/manage/movies/add" element={<MoviesAdd />} />
                  <Route path="/manage/movies/edit" element={<MoviesEdit />} />
                  <Route
                    path="/manage/movies/review"
                    element={<MoviesReview />}
                  />
                  <Route path="/manage/actors" element={<Actors />} />
                  <Route path="/manage/actors/add" element={<ActorsAdd />} />
                  <Route path="/manage/actors/edit" element={<ActorsEdit />} />
                  <Route path="/manage/users" element={<Users />} />
                  <Route path="/manage/users/edit" element={<UsersEdit />} />
                </Route>
              </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Created By Mark Brian @ 2022
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
