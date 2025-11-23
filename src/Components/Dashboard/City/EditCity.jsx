/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal } from "antd";
import RButton from "../../../ui/RButton";

const EditCity = ({ editCityModal, handleCancel }) => {
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
        open={editCityModal}
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
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                City Name
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

            <RButton loadingMessage="Edit City" htmlType="submit" />
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default EditCity;
