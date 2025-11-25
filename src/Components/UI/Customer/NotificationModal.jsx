/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal } from "antd";
import RButton from "../../../ui/RButton";
import { useSendNotificationMutation } from "../../../Redux/api/dashboard/dashboardApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const NotificationModal = ({ isModalOpen, handleCancel, postcodes }) => {
  const [form] = Form.useForm();
  const [addNotification] = useSendNotificationMutation();
  const onFinish = async (values) => {
    const payload = {
      postalCode: postcodes,
      target: "all",
      message: {
        en: values.en,
        de: values.de,
      },
    };

    console.log(payload);
    const res = await tryCatchWrapper(
      addNotification,
      { body: payload },
      "Sending Notification..."
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
        // title="Confirm Delete"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          className=" w-full"
          onFinish={onFinish}
        >
          <div>
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Write Your Notification In English
              </label>
              <Form.Item
                name="en"
                className="text-base-color text-base font-medium"
                rules={[
                  {
                    required: true,
                    message: "Notification is Required",
                  },
                ]}
              >
                <Input
                  placeholder="Notification Message..."
                  className="px-4 py-3 rounded-xl bg-transparent border-black hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                />
              </Form.Item>
            </div>
            <div>
              <label className="text-base-color text-sm font-semibold block mb-2">
                Write Your Notification In German
              </label>
              <Form.Item
                name="de"
                className="text-base-color text-base font-medium"
                rules={[
                  {
                    required: true,
                    message: "Notification is Required",
                  },
                ]}
              >
                <Input
                  placeholder="Notification Message..."
                  className="px-4 py-3 rounded-xl bg-transparent border-black hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                />
              </Form.Item>
            </div>

            <RButton loadingMessage={"Send Notification"} type="submit" />
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default NotificationModal;
