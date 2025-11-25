/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ConfigProvider, Form, Input, Modal, TimePicker, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetAllBusinessQuery,
  useUpdateDealMutation,
} from "../../../Redux/api/deals/dealsApi";
import dayjs from "dayjs";
import ReuseSelect from "../../UI/Form/ReusableSelect";
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

const EditDealModal = ({ handleCancel, editDealsModalOpen, currentRecord }) => {
  const [form] = Form.useForm();
  const { data: businessData } = useGetAllBusinessQuery({});
  const allBusinesses = businessData?.data?.attributes || [];
  const [timeFrames, setTimeFrames] = useState([]);
  const [updateDeal] = useUpdateDealMutation();

  useEffect(() => {
    if (currentRecord) {
      // Prefill main form
      form.setFieldsValue({
        businessName: currentRecord.businessId,
        dealType: currentRecord.dealType,
        description: currentRecord.description,
        benefitAmount: currentRecord.benefitAmount,
        reusableAfter: currentRecord.reusableAfter,
      });

      // Prefill time frames
      const frames = currentRecord.openingHours?.map((frame) => ({
        day: frame.day.toLowerCase(), // lowercase to match dayOptions.value
        startTime: dayjs(frame.openingTime, "hh:mm A"),
        endTime: dayjs(frame.closingTime, "hh:mm A"),
      })) || [{ day: null, startTime: null, endTime: null }];

      setTimeFrames(frames);
    }
  }, [currentRecord, form]);

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

  const onFinish = async (values) => {
    const activeTime = timeFrames
      .filter((frame) => frame.day && frame.startTime && frame.endTime)
      .map((frame) => ({
        day: frame.day.charAt(0).toUpperCase() + frame.day.slice(1),
        startTime: frame.startTime.format("HH:mm"),
        endTime: frame.endTime.format("HH:mm"),
      }));

    const payload = {
      business: values.businessName,
      description: values.description || "",
      dealType: values.dealType || "",
      benefitAmmount: values.benefitAmount || 0,
      reuseableAfter: values.reusableAfter || 0,
      maxClaimCount: currentRecord.maxClaimCount || 1,
      activeTime,
    };

    const res = await tryCatchWrapper(
      updateDeal,
      { body: payload, params: currentRecord?._id },
      "Updating Deal..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
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
        open={editDealsModalOpen}
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
                className="!mb-0"
                rules={[
                  { required: true, message: "Please select a business" },
                ]}
              >
                <ReuseSelect
                  value={form.getFieldValue("businessName") || null}
                  name="businessName"
                  selectClassName="!w-full !bg-transparent !h-10 !rounded"
                  labelClassName="!font-medium"
                  disabled={false}
                  showSearch
                  options={allBusinesses.map((b) => ({
                    value: b._id,
                    label: b.name,
                  }))}
                  onChange={(value) =>
                    form.setFieldsValue({ businessName: value })
                  }
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
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
                    value={frame.day || null} // value comes from state
                    selectClassName="!w-full !bg-transparent !h-10 !rounded"
                    labelClassName="!font-medium"
                    options={dayOptions}
                    onChange={(value) =>
                      handleTimeFrameChange(index, "day", value)
                    } // update only this index
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

                {timeFrames.length > 1 && (
                  <Button
                    type="text"
                    icon={<MinusCircleOutlined />}
                    danger
                    onClick={() => handleRemoveTimeFrame(index)}
                  />
                )}
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
              <span className="!text-white">Update Deal</span>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default EditDealModal;
