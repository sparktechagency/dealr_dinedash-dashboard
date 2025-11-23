/* eslint-disable react/prop-types */
import { Form, Select, Typography } from "antd";
import { cn } from "../../../utils/cn";

const { Option } = Select;

const ReuseSelect = ({
  showSearch = false,
  Typolevel = 5,
  label,
  name,
  rules = [],
  placeholder,
  disabled,
  options,
  value,
  loading = false,
  onChange,
  filterOption,
  allowClear = false,
  mode,
  wrapperClassName,
  labelClassName,
  selectClassName,
  defaultValue = "",
  prefix,
  optionFilterProp,
}) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item name={name} rules={rules}>
        <Select
          showSearch={showSearch}
          filterOption={filterOption}
          optionFilterProp={optionFilterProp}
          loading={loading}
          mode={mode}
          className={cn(
            "!h-12 !text-secondary-color !bg-[#EFEFEF] !ring-0 rounded-md",
            selectClassName
          )}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          onChange={onChange}
          defaultValue={defaultValue}
          prefix={prefix}
        >
          {options?.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default ReuseSelect;
