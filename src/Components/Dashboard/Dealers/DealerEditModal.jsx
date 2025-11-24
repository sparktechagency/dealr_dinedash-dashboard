/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ReuseUpload from "../../UI/Form/ReuseUpload";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useEditProfileAsAdminMutation } from "../../../Redux/api/user/userApi";

const DealerEditModal = ({ isEditModalOpen, handleCancel, currentRecord }) => {
  const [form] = Form.useForm();
  const [editProfile] = useEditProfileAsAdminMutation();
  const [fields, setFields] = useState([{ name: "business-0" }]);

  // When modal opens, populate form with API data
  useEffect(() => {
    if (isEditModalOpen && currentRecord) {
      form.setFieldsValue({
        fullName: currentRecord?.fullName || "",
        email: currentRecord?.email || "",
        postalCode: currentRecord?.postalCode || "",
      });

      // Set business fields dynamically
      if (currentRecord?.businessNames?.length > 0) {
        const businessFields = currentRecord?.businessNames.map(
          (name, index) => ({
            name: `business-${index}`,
            value: name,
          })
        );
        setFields(businessFields);
        form.setFieldsValue(
          businessFields.reduce(
            (acc, field) => ({ ...acc, [field.name]: field.value }),
            {}
          )
        );
      } else {
        setFields([{ name: "business-0" }]);
      }
    }
  }, [isEditModalOpen, currentRecord, form]);

  const handleAddField = () => {
    const nextIndex = fields.length;
    const newField = { name: `business-${nextIndex}` };
    setFields([...fields, newField]);
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    // Handle image upload
    if (values?.image?.[0]?.originFileObj) {
      formData.append("image", values.image[0].originFileObj);
    }

    // Collect business names from dynamic fields
    const businessNames = fields.map((field) => values[field.name]);

    const data = {
      fullName: values.fullName,
      email: values.email,
      postalCode: values.postalCode,
      businessNames,
    };

    formData.append("data", JSON.stringify(data));

    const res = await tryCatchWrapper(
      editProfile,
      { body: formData, params: currentRecord?._id },
      "Updating..."
    );
    console.log(res);

    if (res?.statusCode === 201) {
      form.resetFields();
      setFields([{ name: "business-0" }]);
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
          },
        },
      }}
    >
      <Modal
        open={isEditModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        style={{ top: 100 }}
      >
        <div className="mt-8">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <ReuseUpload
              label="Business Image"
              name="image"
              buttonText="Upload Image"
              accept="image/*"
              maxCount={1}
              labelClassName="!font-semibold"
            />
            <p className="mb-8">{currentRecord?.image}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base-color text-sm font-semibold block mb-2">
                  Full Name
                </label>
                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: "Full Name is required" }]}
                >
                  <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent" />
                </Form.Item>
              </div>

              <div>
                <label className="text-base-color text-sm font-semibold block mb-2">
                  Email
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent" />
                </Form.Item>
              </div>
            </div>

            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Postal Code
              </label>
              <Form.Item
                name="postalCode"
                rules={[{ required: true, message: "Postal code is required" }]}
              >
                <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent" />
              </Form.Item>
            </div>

            <div>
              <div className="flex justify-between mb-2 cursor-pointer">
                <label className="text-base-color text-sm font-semibold block mb-2">
                  Business
                </label>
                <Button
                  onClick={handleAddField}
                  className="flex items-center justify-end py-[1px] px-3 border border-[#9E9E9E] rounded-sm bg-transparent hover:!bg-transparent"
                >
                  <FaPlus /> Add
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.name} className="flex items-center gap-2">
                  <Form.Item
                    name={field.name}
                    rules={[
                      { required: true, message: "Business name is required" },
                    ]}
                    className="flex-1 mb-2"
                  >
                    <Input
                      placeholder={`Business ${index + 1}`}
                      className="px-4 py-2 rounded-xl border-[#000] !bg-transparent"
                    />
                  </Form.Item>

                  {/* Show minus button only if more than 1 field */}
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      danger
                      onClick={() => {
                        const newFields = fields.filter(
                          (f) => f.name !== field.name
                        );
                        setFields(newFields);
                        form.setFieldsValue({
                          ...form.getFieldsValue(),
                          [field.name]: undefined, // clear removed field value
                        });
                      }}
                    >
                      <FaMinus />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DealerEditModal;
