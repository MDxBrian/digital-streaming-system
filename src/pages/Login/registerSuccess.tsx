import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
function RegisterSuccess() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <Result
      status="success"
      title="Successfully Registered!"
      subTitle="Back to the Home Page and try to Sign In."
      extra={[
        <Button type="primary" key="console" onClick={goHome}>
          Go HOME
        </Button>,
      ]}
    />
  );
}

export default RegisterSuccess;
