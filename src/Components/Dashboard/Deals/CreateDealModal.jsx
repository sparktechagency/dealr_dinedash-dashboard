/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Modal,
  TimePicker,
  Button,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ReuseSelect from "../../UI/Form/ReusableSelect";
import {
  useAddDealMutation,
  useGetAllBusinessQuery,
} from "../../../Redux/api/deals/dealsApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

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
  const [form] = Form.useForm();
  const { data: businessData } = useGetAllBusinessQuery({});
  const allBusinesses = businessData?.data?.attributes || [];
  const [addDeal] = useAddDealMutation();

  const [timeFrames, setTimeFrames] = useState([
    { day: null, startTime: null, endTime: null },
  ]);

  const onFinish = async (values) => {
    const activeTime = timeFrames
      .filter((frame) => frame.day && frame.startTime && frame.endTime)
      .map((frame) => ({
        day: frame.day.charAt(0).toUpperCase() + frame.day.slice(1),
        startTime: frame.startTime.format("HH:mm"),
        endTime: frame.endTime.format("HH:mm"),
      }));

    const payload = {
      business: values.businessName, // send selected business ID
      description: values.description || "",
      isActive: true,
      benefitAmmount: Number(values.benefitAmount) || 0,
      dealType: values.dealType || "",
      reuseableAfter: Number(values.reusableAfter) || 0,
      maxClaimCount: Number(values.maxClaimCount) || 1,
      activeTime,
    };

    const res = await tryCatchWrapper(
      addDeal,
      { body: payload },
      "Creating New Deal..."
    );
    console.log(res);

    if (res?.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
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
          form={form}
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
                rules={[
                  { required: true, message: "Please select a business" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select business"
                  optionFilterProp="children" // search in option text
                  className="!w-full !bg-transparent !h-10 !rounded"
                  onChange={(value) =>
                    form.setFieldsValue({ businessName: value })
                  }
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {allBusinesses.map((business) => (
                    <Select.Option key={business._id} value={business._id}>
                      {business.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Deal Type *
              </label>
              <Form.Item
                value={form.getFieldValue("dealType") || null}
                name="dealType"
              >
                <Input
                  className="px-4 py-2 rounded bg-transparent border-[#0C0C0C]"
                  rows={3}
                />
              </Form.Item>
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
                    value={frame.day || null}
                    name="day"
                    selectClassName="!w-full !bg-transparent !h-10 !rounded"
                    labelClassName="!font-medium"
                    disabled={false}
                    options={dayOptions}
                    onChange={(value) =>
                      handleTimeFrameChange(index, "day", value)
                    }
                  />
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
            <Button
              htmlType="submit"
              className="mt-5 !text-white !bg-[#185DDE] !py-5 !w-full"
            >
              <span className="!text-white">Create Deal</span>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default CreateDealModal;
