import { ConfigProvider, Form, Input, Modal } from "antd";
import RButton from "../../../ui/RButton";

const NotificationModal = ({ isModalOpen, handleCancel }) => {
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
        // title="Confirm Delete"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" className=" w-full" onFinish={onFinish}>
          <div>
            <label className="text-base-color text-sm font-semibold block mb-2">
              Write Your Notification
            </label>
            <Form.Item
              name="notification"
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

            <RButton loadingMessage={"Send Notification"} type="submit" />
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default NotificationModal;
