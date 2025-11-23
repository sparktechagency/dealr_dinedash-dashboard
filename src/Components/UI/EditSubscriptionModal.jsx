/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select } from "antd";
import { toast } from "sonner";
import { useUpdateSubscriptionMutation } from "../../Redux/api/subscription/subscriptionApi";
import { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const EditSubscriptionModal = ({
  isEditModalOpen,
  handleCancelEditModal,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [facilities, setFacilities] = useState([""]);
  const [updateSubscription] = useUpdateSubscriptionMutation();

  // Pre-fill form when currentRecord changes
  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        planCategory: currentRecord.duration === 30 ? "monthly" : "yearly",
        planName: currentRecord.planName,
        shortBio: currentRecord.description,
        planPrice: currentRecord.price,
      });
      setFacilities(
        currentRecord.feature?.length ? currentRecord.feature : [""]
      );
    }
  }, [currentRecord, form]);

  const handleAdd = () => {
    setFacilities([...facilities, ""]);
  };

  const handleChange = (index, value) => {
    const newFacilities = [...facilities];
    newFacilities[index] = value;
    setFacilities(newFacilities);
  };

  const handleRemove = (index) => {
    if (facilities.length === 1) return; // Always keep at least 1
    const newFacilities = facilities.filter((_, i) => i !== index);
    setFacilities(newFacilities);
  };

  const handleSave = () => {
    const toastId = toast.loading("Loading....");

    form.validateFields().then((values) => {
      const updatedSubscription = {
        planName: values.planName,
        description: values.shortBio,
        feature: facilities,
        price: Number(values.planPrice),
        duration: values.planCategory === "monthly" ? 30 : 365,
      };

      updateSubscription({
        newSubscription: updatedSubscription,
        id: currentRecord._id,
      })
        .unwrap()
        .then(() => {
          toast.success("Subscription updated", {
            id: toastId,
            duration: 2000,
          });
        })
        .catch((error) => {
          toast.error(
            error?.data?.message || error?.error || "Something went wrong",
            { id: toastId, duration: 2000 }
          );
        });

      handleCancelEditModal();
    });
  };

  return (
    <Modal
      open={isEditModalOpen}
      onCancel={handleCancelEditModal}
      centered
      footer={null}
    >
      <Form form={form} onFinish={handleSave} layout="vertical" className="p-4">
        {/* Plan Category */}
        <Form.Item
          label="Plan Category"
          name="planCategory"
          style={{ fontWeight: "500", margin: "15px 0px" }}
        >
          <Select
            placeholder="Select plan category"
            className="h-11 !text-sm"
            style={{ backgroundColor: "transparent", color: "#000" }}
          >
            <Option value="monthly">Monthly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>
        </Form.Item>

        {/* Plan Name */}
        <Form.Item
          label="Plan Name"
          name="planName"
          style={{ fontWeight: "500", margin: "15px 0px" }}
        >
          <Input
            placeholder="Enter Plan name"
            className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
          />
        </Form.Item>

        {/* Short Bio */}
        <Form.Item
          label="Short Bio"
          name="shortBio"
          style={{ fontWeight: "500", margin: "15px 0px" }}
        >
          <Input
            placeholder="Enter a short bio"
            className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
          />
        </Form.Item>

        {/* Plan Price */}
        <Form.Item
          label="Plan Price"
          name="planPrice"
          style={{ fontWeight: "500", margin: "15px 0px" }}
        >
          <Input
            placeholder="Plan price"
            type="number"
            className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
          />
        </Form.Item>

        {/* Facilities */}
        <Form.Item
          label="Facilities"
          name="facilities"
          style={{ fontWeight: "500", margin: "15px 0px" }}
        >
          {facilities.map((facility, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                value={facility}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={`Facility ${index + 1}`}
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent flex-1"
              />
              {facilities.length > 1 && (
                <MinusCircleOutlined
                  onClick={() => handleRemove(index)}
                  className="text-red-500 text-xl cursor-pointer"
                />
              )}
            </div>
          ))}
          <Button
            onClick={handleAdd}
            icon={<PlusOutlined />}
            type="dashed"
            style={{ marginTop: "10px" }}
          >
            Add Facility
          </Button>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            onClick={handleSave}
            className="w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium mt-6"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSubscriptionModal;
