/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal, Select, Upload } from "antd";
import RButton from "../../../ui/RButton";
import { useEffect } from "react";
import { RxUpload } from "react-icons/rx";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddPromotionMutation } from "../../../Redux/api/promotion/promotionApi";

const AddPromotion = ({ addPromotionModal, handleCancel }) => {
  const [add] = useAddPromotionMutation();
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);

  console.log(type);

  // Always load with minimum 1 field
  useEffect(() => {
    form.setFieldsValue({
      type: "normal",
    });
  }, [form]);

  const onFinish = async (values) => {
    console.log(values);

    const formData = new FormData();

    const payload = {
      type: values.type,
      subject: values.subject,
      couponCode: values.couponCode,
      discount: values.discount,
    };

    formData.append("data", JSON.stringify(payload));

    if (values.image.file.originFileObj) {
      formData.append("image", values.image.file.originFileObj);
    }

    const res = await tryCatchWrapper(
      add,
      { body: formData },
      "Creating New Promotion..."
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
        open={addPromotionModal}
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
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Promotion type is required",
                  },
                ]}
              >
                <Select
                  className=" rounded-xl !border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000] min-h-9"
                  selectedValue={type}
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "coupon", label: "Coupon" },
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
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Coupon Code
              </label>
              <Form.Item
                name="couponCode"
                rules={[
                  {
                    required: true,
                    message: "Coupon Code is required",
                  },
                ]}
              >
                <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000]" />
              </Form.Item>
            </div>
            {type !== "normal" && (
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

            <RButton type="submit" loadingMessage="Add Promotion" />
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddPromotion;
