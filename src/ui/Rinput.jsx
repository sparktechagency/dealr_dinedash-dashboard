/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Input } from "antd";
import { cn } from "../utils/cn";

const RInput = ({ label, type, name, placeholder, className }) => {
  return (
    <Form.Item
      name={name}
      className="text-base-color text-base font-medium"
      rules={[
        {
          required: true,
          message: `${label} is Required`,
        },
      ]}
    >
      <label className="mb-2 block font-semibold">{label}</label>
      <Input
        placeholder={placeholder}
        className={cn(
          `px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none`,
          className
        )}
      />
    </Form.Item>
  );
};

export default RInput;
