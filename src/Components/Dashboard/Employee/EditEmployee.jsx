/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal, Select } from "antd";
import RButton from "../../../ui/RButton";
import { useEffect } from "react";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateAdminMutation } from "../../../Redux/api/employee/employeeApi";

const EditEmployee = ({ editEmployModal, currentRecord, handleCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [editEmployee] = useUpdateAdminMutation();

  const categoryOptions = [
    "all",
    "customers",
    "dealer",
    "potential-dealer",
    "deals",
    "cities",
    "subscription",
  ];

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        fullName: currentRecord?.fullName,
        email: currentRecord?.email,
        phone: currentRecord?.formatted_phone_number,
        categoryPermissions: Array.isArray(currentRecord?.categories)
          ? currentRecord.categories
          : [],
      });
    }
  }, [currentRecord, form]);
  const onFinish = async (values) => {
    const res = await tryCatchWrapper(
      editEmployee,
      {
        body: { ...values, adminRole: "sub-admin" },
        params: currentRecord?._id,
      },
      "Updating Employee..."
    );
    console.log(res);

    if (res?.statusCode === 201) {
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
          },
        },
      }}
    >
      <Modal
        open={editEmployModal}
        onCancel={handleCancel}
        footer={null}
        width={700}
        style={{ top: 100 }}
      >
        <div className="mt-8">
          <Form
            form={form}
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Name
              </label>
              <Form.Item
                name="fullName"
                className="text-base-color text-base font-medium"
                rules={[
                  {
                    required: true,
                    message: "Name is Required",
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
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Phone
              </label>
              <Form.Item
                name="formatted_phone_number"
                className="text-base-color text-base font-medium"
                rules={[
                  {
                    required: true,
                    message: "Phone Number is Required",
                  },
                ]}
              >
                <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000] focus:outline-none" />
              </Form.Item>
            </div>

            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Category
              </label>
              <Form.Item
                name="categoryPermissions"
                className="text-base-color text-base font-medium"
                rules={[
                  {
                    required: true,
                    message: "Category is required",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Select categories"
                  className="!h-10 !text-base-color !placeholder:text-[#B5B5B5] !border-none !ring-0 rounded-md "
                >
                  {categoryOptions?.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <RButton type="submit" loadingMessage="Add Employee" />
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default EditEmployee;
