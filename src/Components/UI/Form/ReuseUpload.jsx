/* eslint-disable react/prop-types */
import { Form, Upload, Typography, Button } from "antd";
import { TbCloudUpload } from "react-icons/tb";
import { cn } from "../../../utils/cn";

const ReuseUpload = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  buttonText = "Upload",
  accept = "image/*",
  maxCount = 1,
  children = (
    <div className="!w-full min-w-[300px] lg:min-w-[410px] border-dashed border border-secondary-color rounded-md min-h-[200px] flex flex-col items-center justify-center gap-2 cursor-pointer">
      <TbCloudUpload className="size-10 text-secondary-color" />
      <p className="text-base-color text-sm sm:text-base lg:text-lg font-semibold">
        {buttonText}
      </p>
      <Button className="!text-xs sm:!text-sm lg:!text-base !py-4 w-fit !bg-[#185DDE] !border-[#185DDE] !text-white">
        Browse File
      </Button>
    </div>
  ),
  wrapperClassName,
  labelClassName,
  uploadClassName,
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
      <Form.Item
        name={name}
        rules={rules}
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload
          customRequest={(options) => {
            setTimeout(() => {
              if (options.onSuccess) {
                options.onSuccess("ok");
              }
            }, 1000);
          }}
          maxCount={maxCount}
          accept={accept}
          listType="picture"
          className={cn(uploadClassName)}
        >
          {children}
        </Upload>
      </Form.Item>
    </div>
  );
};

export default ReuseUpload;
