/* eslint-disable react/prop-types */
import { Spin } from "antd";

const Spinner = ({ size }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spin size={size} />
    </div>
  );
};
export default Spinner;
