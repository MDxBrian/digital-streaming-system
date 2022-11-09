const { Navigate, Outlet } = require("react-router-dom");

const PrivateRoute = () => {
  const logginUserId = sessionStorage.getItem("token");
  if (!logginUserId) {
    return (
      <div>
        <Navigate to="/" />
      </div>
    );
  } else {
    return (
      <section>
        <Outlet />
      </section>
    );
  }
};

export default PrivateRoute;
