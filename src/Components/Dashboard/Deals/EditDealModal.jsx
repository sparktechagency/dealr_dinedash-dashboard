/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input, Modal } from "antd";
import ReuseSelect from "../../UI/Form/ReusableSelect";
import TextArea from "antd/es/input/TextArea";
import RButton from "../../../ui/RButton";

const EditDealModal = ({ handleCancel, editDealsModalOpen }) => {
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
            zIndex: 9999999,
          },
        },
      }}
    >
      <Modal
        // title="Confirm Delete"
        open={editDealsModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={950}
        style={{ top: 100 }}
      >
        <Form
          layout="vertical"
          className="bg-transparent w-full"
          onFinish={onFinish}
        >
          <div className="flex items-center justify-between gap-x-5">
            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Dealer Name
              </label>
              <Form.Item
                name="email"
                className="text-base-color text-base font-medium"
                rules={[
                  {
                    required: true,
                    message: "Name is Required",
                  },
                ]}
              >
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
              </Form.Item>
            </div>

            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Email Address
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
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
              </Form.Item>
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-5">
            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Contact Person
              </label>
              <Form.Item
                name="email"
                className="text-base-color text-base font-medium"
              >
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
              </Form.Item>
            </div>

            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Website
              </label>
              <Form.Item
                name="email"
                className="text-base-color text-base font-medium"
              >
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
              </Form.Item>
            </div>
          </div>

          <div className="w-full">
            <ReuseSelect
              // defaultValue={value}
              value={"Monthly Earning"}
              // onChange={(e) => setValue(e)}
              name="month"
              selectClassName="!w-full !bg-transparent !h-10 !rounded"
              labelClassName="!font-medium"
              label="Dealer Type"
              disabled={false}
              options={[
                { value: "restaurant", label: "Restaurant" }, // {
                { value: "activity", label: "Activity" },
              ]}
            />
          </div>

          <div className="w-full">
            <label className="text-base-color text-sm font-semibold block mb-2">
              Address
            </label>
            <Form.Item
              name="email"
              className="text-base-color text-base font-medium"
            >
              <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
            </Form.Item>
          </div>

          <div className="w-full">
            <ReuseSelect
              // defaultValue={value}
              value={"Monthly Earning"}
              // onChange={(e) => setValue(e)}
              name="month"
              selectClassName="!w-full !bg-transparent !h-10 "
              labelClassName="!font-medium"
              label="Acquisition Status"
              disabled={false}
              options={[
                { value: "Prospect", label: "Prospect" }, // {
                { value: "Contacted", label: "Contacted" },
                { value: "Negotiating", label: "Negotiating" },
                { value: "Closed", label: "Closed" },
              ]}
            />
          </div>

          <div className="w-full">
            <label className="text-base-color text-sm font-semibold block mb-2">
              Comments
            </label>
            <Form.Item
              name="email"
              className="text-base-color text-base font-medium"
            >
              <TextArea
                className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none"
                rows={4}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <RButton
              isLoading={false}
              loadingMessage="Add Dealer"
              type={"submit"}
              className="mt-5"
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default EditDealModal;
