/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Button,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import RButton from "../../../ui/RButton";
import ReuseSelect from "../../UI/Form/ReusableSelect";
import dayjs from "dayjs";

const dayOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const CreateDealModal = ({ handleCancel, isDealAddModalOpen }) => {
  const [timeFrames, setTimeFrames] = useState([
    { day: null, startTime: null, endTime: null },
  ]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log({ ...values, timeFrames });
    message.success("Deal Created!");
    handleCancel();
  };

  const handleAddTimeFrame = () => {
    setTimeFrames([
      ...timeFrames,
      { day: null, startTime: null, endTime: null },
    ]);
  };

  const handleRemoveTimeFrame = (index) => {
    const updated = [...timeFrames];
    updated.splice(index, 1);
    setTimeFrames(updated);
  };

  const handleTimeFrameChange = (index, field, value) => {
    const updated = [...timeFrames];
    updated[index][field] = value;
    setTimeFrames(updated);
  };

  const validateTimeGap = (start, end) => {
    if (!start || !end) return false;
    const diffHours = end.diff(start, "hour", true);
    return diffHours >= 4;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorBgElevated: "#B7CDF5",
            borderRadiusLG: 8,
            zIndex: 9999999,
          },
        },
      }}
    >
      <Modal
        open={isDealAddModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={950}
        style={{ top: 100 }}
      >
        <Form
          layout="vertical"
          className="bg-transparent w-full"
          onFinish={onFinish}
        >
          {/* Business Name & Deal Type */}
          <div className="flex items-center justify-between gap-x-5">
            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Business Name *
              </label>
              <Form.Item
                name="businessName"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C]" />
              </Form.Item>
            </div>

            <div className="w-full">
              <ReuseSelect
                value={null}
                name="dealType"
                selectClassName="!w-full !bg-transparent !h-10 !rounded"
                labelClassName="!font-medium"
                label="Deal Type *"
                disabled={false}
                options={[
                  { value: "restaurant", label: "Restaurant" },
                  { value: "activity", label: "Activity" },
                ]}
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="text-base-color text-sm font-semibold block mb-2">
              Description
            </label>
            <Form.Item name="description">
              <TextArea
                className="px-4 py-2 rounded bg-transparent border-[#0C0C0C]"
                rows={3}
              />
            </Form.Item>
          </div>

          {/* Active Time Frames */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-5">
              <label className="text-base-color font-semibold block mb-2">
                Active Time Frames *
              </label>

              {/* Add button */}
              <Button
                icon={<PlusOutlined />}
                onClick={handleAddTimeFrame}
                className="bg-transparent border border-[#9E9E9E]"
              >
                Add
              </Button>
            </div>

            {timeFrames.map((frame, index) => (
              <div
                key={index}
                className="p-6 border border-gray-600 rounded space-y-4"
              >
                {/* Day */}
                <div className="w-full">
                  <label className="text-base-color font-semibold block mb-2">
                    Day
                  </label>

                  <ReuseSelect
                    value={null}
                    name="day"
                    selectClassName="!w-full !bg-transparent !h-10 !rounded"
                    labelClassName="!font-medium"
                    disabled={false}
                    options={[
                      { value: "monday", label: "Monday" },
                      { value: "tuesday", label: "Tuesday" },
                      { value: "wednesday", label: "Wednesday" },
                      { value: "thursday", label: "Thursday" },
                      { value: "friday", label: "Friday" },
                      { value: "saturday", label: "Saturday" },
                      { value: "sunday", label: "Sunday" },
                    ]}
                    onChange={(value) =>
                      handleTimeFrameChange(index, "day", value)
                    }
                  />
                  {/* <Select
                    placeholder="Select day"
                    options={dayOptions}
                    value={frame.day}
                    onChange={(value) =>
                      handleTimeFrameChange(index, "day", value)
                    }
                    className="w-full"
                  /> */}
                </div>

                {/* Start Time */}
                <div className="flex items-center justify-between gap-x-8">
                  <div className="w-full">
                    <label className="text-base-color font-semibold block mb-2">
                      Start Time
                    </label>
                    <TimePicker
                      format="HH:mm"
                      value={frame.startTime}
                      onChange={(value) =>
                        handleTimeFrameChange(index, "startTime", value)
                      }
                      className="w-full bg-transparent"
                    />
                  </div>

                  <div className="w-full">
                    {/* End Time */}
                    <label className="text-base-color font-semibold block mb-2">
                      End Time
                    </label>
                    <TimePicker
                      format="HH:mm"
                      value={frame.endTime}
                      onChange={(value) =>
                        handleTimeFrameChange(index, "endTime", value)
                      }
                      className="w-full bg-transparent"
                    />
                  </div>
                </div>

                {/* Remove */}
                {timeFrames.length > 1 && (
                  <Button
                    type="text"
                    icon={<MinusCircleOutlined />}
                    danger
                    onClick={() => handleRemoveTimeFrame(index)}
                  />
                )}

                {/* Min time length notice */}
                <p className="text-lg text-black mt-[-5px] mb-2">
                  • Time frames must be at least 4 hours long
                </p>
              </div>
            ))}
          </div>

          {/* Benefit Amount */}
          <div className="w-full mt-4">
            <label className="text-base-color text-sm font-semibold block mb-2">
              Benefit Amount
            </label>
            <Form.Item name="benefitAmount">
              <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C]" />
            </Form.Item>
          </div>

          {/* Reusable After */}
          <div className="w-full">
            <label className="text-base-color text-sm font-semibold block mb-2">
              Reusable After
            </label>
            <Form.Item name="reusableAfter">
              <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C]" />
            </Form.Item>
          </div>

          {/* Submit */}
          <Form.Item>
            <RButton
              isLoading={loading}
              loadingMessage="Creating..."
              type={"submit"}
              className="mt-5"
            >
              Create Deal
            </RButton>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default CreateDealModal;
