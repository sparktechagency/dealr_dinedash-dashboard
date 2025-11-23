/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import RButton from "../../../ui/RButton";
import { useEffect } from "react";
import { useAddCityMutation } from "../../../Redux/api/city/cityApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const AddCity = ({ addCityModal, handleCancel }) => {
  const [form] = Form.useForm();
  const [addCity] = useAddCityMutation();

  // Always load with minimum 1 field
  useEffect(() => {
    if (!form.getFieldValue("postalCode")) {
      form.setFieldsValue({ postalCode: [""] });
    }
  }, [form]);

  const onFinish = async (values) => {
    const payload = {
      cityName: values.cityName,
      postalCode: values.postalCode || [],
    };
    const res = await tryCatchWrapper(
      addCity,
      { body: payload },
      "Creating New City..."
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
        open={addCityModal}
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
                City Name
              </label>
              <Form.Item
                name="cityName"
                rules={[
                  {
                    required: true,
                    message: "City name is required",
                  },
                ]}
              >
                <Input className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000]" />
              </Form.Item>
            </div>

            {/* POSTAL CODE DYNAMIC INPUTS */}
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Postcode
              </label>

              <Form.List name="postalCode">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <div
                        key={field.key}
                        className="flex gap-2 mb-3 items-start"
                      >
                        <Form.Item
                          name={field.name}
                          fieldKey={field.key}
                          rules={[
                            { required: true, message: "Postcode is required" },
                          ]}
                          className="flex-1 !m-0"
                        >
                          <Input
                            type="number"
                            placeholder="Enter postcode"
                            className="px-4 py-2 rounded-xl border-[#000] !bg-transparent hover:border-[#000] focus:border-[#000]"
                          />
                        </Form.Item>

                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                            className="text-red-500 text-xl cursor-pointer mt-2"
                          />
                        )}
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="capitalize text-sm w-full mt-2 !bg-transparent !border-[#185DDE] mb-5"
                    >
                      Add Postcode
                    </Button>
                  </>
                )}
              </Form.List>
            </div>

            <RButton type="submit" loadingMessage="Add City" />
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddCity;
