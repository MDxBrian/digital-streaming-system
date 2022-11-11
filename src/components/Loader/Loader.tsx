import { useContext } from "react";
import { Spin } from "antd";
import LoaderContext from "../../context/LoaderContext";
const Loader = ({ children }: any) => {
  const { loading } = useContext(LoaderContext);
  return (
    <Spin spinning={loading} tip="Loading...">
      {children}
    </Spin>
  );
};

export default Loader;
