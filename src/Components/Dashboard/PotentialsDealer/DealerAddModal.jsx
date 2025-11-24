import { ConfigProvider, Form, Input, Modal } from "antd";
import RButton from "../../../ui/RButton";
import TextArea from "antd/es/input/TextArea";
import ReuseSelect from "../../UI/Form/ReusableSelect";
import { useAddPotentialDealerMutation } from "../../../Redux/api/potentialDealer/potentialDealerApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

// eslint-disable-next-line react/prop-types
const DealerAddModal = ({ isDealerAddModalOpen, setIsDealerAddModalOpen }) => {
  const [form] = Form.useForm();
  const [addPotentialDealer] = useAddPotentialDealerMutation();
  const onFinish = async (values) => {
    const payload = {
      businessName: values.businessName,
      email: values.email,
      detialsAddress: values.detialsAddress,
      dealerType: values.dealerType,
      contactPerson: values.contactPerson,
      website: values.website,
      acquisitionStatus: values.acquisitionStatus,
      comments: values.comments,
    };

    const res = await tryCatchWrapper(
      addPotentialDealer,
      { body: payload },
      "Creating New Dealer..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
      setIsDealerAddModalOpen(false);
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
        open={isDealerAddModalOpen}
        onCancel={() => setIsDealerAddModalOpen(false)}
        footer={null}
        width={950}
        style={{ top: 100 }}
      >
        <Form
          form={form}
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
                name="businessName"
                rules={[{ required: true, message: "Name is Required" }]}
              >
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] ..." />
              </Form.Item>
            </div>

            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Email Address
              </label>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Email is Required" }]}
              >
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] ..." />
              </Form.Item>
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-5">
            <div className="w-full">
              <label className="text-base-color text-sm font-semibold block mb-2">
                Contact Person
              </label>
              <Form.Item
                name="contactPerson"
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
                name="website"
                className="text-base-color text-base font-medium"
              >
                <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
              </Form.Item>
            </div>
          </div>

          <div className="w-full">
            <ReuseSelect
              name="dealerType"
              value={"Monthly Earning"}
              label="Dealer Type"
              selectClassName="!w-full !bg-transparent !h-10 !rounded"
              options={[
                { value: "restaurant", label: "Restaurant" },
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
              name="acquisitionStatus"
              value={"Monthly Earning"}
              label="Acquisition Status"
              selectClassName="!w-full !bg-transparent !h-10"
              options={[
                { value: "Prospect", label: "Prospect" },
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

export default DealerAddModal;
