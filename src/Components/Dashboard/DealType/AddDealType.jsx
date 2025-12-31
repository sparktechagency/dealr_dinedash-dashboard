/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal } from "antd";
import RButton from "../../../ui/RButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddDealTypeMutation } from "../../../Redux/api/dealType/dealTypeApi";

const AddDealType = ({ addDealTypeModal, handleCancel }) => {
  const [form] = Form.useForm();
  const [AddDealType] = useAddDealTypeMutation();

  const onFinish = async (values) => {
    const res = await tryCatchWrapper(
      AddDealType,
      { body: values },
      "Creating New Type..."
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
        open={addDealTypeModal}
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
                name="name"
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

            <RButton type="submit" loadingMessage="Add Type" />
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddDealType;
