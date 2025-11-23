/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const DealerEditModal = ({ isEditModalOpen, handleCancel }) => {
  const [fields, setFields] = useState([{ name: "business-0" }]);

  const handleAddField = () => {
    const nextIndex = fields.length;
    setFields([...fields, { name: `business-${nextIndex}` }]);
  };

  const onFinish = async (values) => {
    console.log(values);
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
          <Form
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base-color text-sm font-semibold block mb-2">
                  Email
                </label>
                <Form.Item
                  name="email"
                  className="text-base-color text-base font-medium"
                  rules={[
                    {
                      required: true,
                      message: "Email is Required",
                    },
                  ]}
                >
                  <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000] focus:outline-none" />
                </Form.Item>
              </div>
              <div>
                <label className="text-base-color text-sm font-semibold block mb-2">
                  Email
                </label>
                <Form.Item
                  name="email"
                  className="text-base-color text-base font-medium"
                  rules={[
                    {
                      required: true,
                      message: "Email is Required",
                    },
                  ]}
                >
                  <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000] focus:outline-none" />
                </Form.Item>
              </div>
            </div>
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Postcode
              </label>
              <Form.Item
                name="email"
                className="text-base-color text-base font-medium"
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
              >
                <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000] focus:outline-none" />
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
                <Form.Item
                  key={field.name}
                  name={field.name}
                  className="text-base-color text-base font-medium"
                  rules={[
                    {
                      required: true,
                      message: "Email is Required",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input
                    placeholder={`Business ${index + 1}`}
                    className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000] focus:outline-none"
                  />
                </Form.Item>
              ))}
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DealerEditModal;
