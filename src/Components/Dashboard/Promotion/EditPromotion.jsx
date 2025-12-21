/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal, Select, Upload } from "antd";
import RButton from "../../../ui/RButton";
import { useEffect } from "react";
import { RxUpload } from "react-icons/rx";

const EditPromotion = ({ isModalOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const type = Form.useWatch("promotionType", form);

  // Always load with minimum 1 field
  useEffect(() => {
    if (!form.getFieldValue("postalCode")) {
      form.setFieldsValue({ postalCode: [""] });
    }
  }, [form]);

  const onFinish = async (values) => {
    console.log(values);
    // const payload = {
    //   cityName: values.cityName,
    //   postalCode: values.postalCode || [],
    // };
    // const res = await tryCatchWrapper(
    //   AddPromotion,
    //   { body: payload },
    //   "Creating New City..."
    // );
    // console.log(res);

    // if (res?.statusCode === 201) {
    //   form.resetFields();
    //   handleCancel();
    // }
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
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        style={{ top: 100 }}
      >
        <div className="mt-8">
          <Form
            layout="vertical"
            form={form}
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            {/* CITY NAME */}
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Promotion Type
              </label>
              <Form.Item
                name="promotionType"
                rules={[
                  {
                    required: true,
                    message: "Promotion type is required",
                  },
                ]}
              >
                <Select
                  className=" rounded-xl !border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000] min-h-12"
                  options={[
                    { value: "Normal", label: "Normal" },
                    { value: "Coupon ", label: "Coupon" },
                  ]}
                />
              </Form.Item>
            </div>

            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Subject
              </label>
              <Form.Item
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Subject is required",
                  },
                ]}
              >
                <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000]" />
              </Form.Item>
            </div>
            {type !== "Normal" && (
              <div>
                <label className="text-base-color text-sm font-semibold block mb-2">
                  Discount %
                </label>
                <Form.Item
                  name="discount"
                  rules={[
                    {
                      required: true,
                      message: "discount is required",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000]"
                  />
                </Form.Item>
              </div>
            )}
            <Form.Item
              name="image"
              className="mb-8 w-full"
              rules={[
                {
                  required: true,
                  message: "Image is required",
                },
              ]}
            >
              <Upload
                maxCount={1}
                listType="text"
                accept="image/*"
                multiple={false}
                customRequest={(options) => {
                  setTimeout(() => {
                    options.onSuccess?.("ok");
                  }, 1000);
                }}
                className=""
              >
                <div className="lg:w-[400px] p-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-transparent hover:border-primary transition-all duration-300 cursor-pointer">
                  <p className="text-3xl mb-2">
                    <RxUpload />
                  </p>
                  <p className="text-black font-medium">
                    Upload your Promotion image here
                  </p>
                </div>
              </Upload>
            </Form.Item>

            <RButton type="submit" loadingMessage="Add City" />
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default EditPromotion;
