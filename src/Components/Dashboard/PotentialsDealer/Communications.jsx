import { Form, Typography, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import RButton from "../../../ui/RButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import {
  useAddCommunicatrionMutation,
  useGetPotentialDealerQuery,
} from "../../../Redux/api/potentialDealer/potentialDealerApi";
import SpinLoader from "../../UI/SpinLoader";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const { Option } = Select;

const Communications = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetPotentialDealerQuery({});
  const potentialDealers = data?.data?.attributes?.result || [];

  const [form] = Form.useForm();
  const [addCommunicatrion] = useAddCommunicatrionMutation();

  const onFinish = async (values) => {
    const payload = {
      pDealerId: values.pDealerId,
      contactType: values.contactType,
      subject: values.subject,
      note: values.note,
    };

    const res = await tryCatchWrapper(
      addCommunicatrion,
      { body: payload },
      "Adding Communication Log..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
    }
  };

  if (isFetching) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{ boxShadow: "1px 1px 11px -5px black" }}
        className="p-6 rounded-xl mt-3 border border-[#B6B6B6]  w-[77vw]"
      >
        <Title level={2}>{t("potentialsDealer.communication")}</Title>
        <p className="text-lg font-normal">
          {t("potentialsDealer.manageYourPotentialDealerRelationships")}
        </p>

        <div className="px-6 py-8">
          <Form
            form={form}
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <div className="flex items-center justify-between gap-x-5">
              <div className="w-full">
                <label className="text-base-color text-lg block mb-2">
                  Select Dealer
                </label>
                <Form.Item
                  name="pDealerId"
                  className="text-base-color text-base font-medium"
                  rules={[{ required: true, message: "Dealer is required" }]}
                >
                  <Select placeholder="Select a dealer">
                    {potentialDealers.map((dealer) => (
                      <Option key={dealer._id} value={dealer._id}>
                        {dealer.businessName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="w-full">
                <label className="text-base-color text-lg block mb-2">
                  Contact Type
                </label>
                <Form.Item
                  name="contactType"
                  className="text-base-color text-base font-medium"
                  rules={[
                    { required: true, message: "Contact type is required" },
                  ]}
                >
                  <Select placeholder="Select contact type">
                    <Option value="call">Call</Option>
                    <Option value="email">Email</Option>
                    <Option value="meeting">Meeting</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="w-full">
              <label className="text-base-color text-lg block mb-2">
                Subject
              </label>
              <Form.Item
                name="subject"
                className="text-base-color text-base font-medium"
                rules={[{ required: true, message: "Subject is required" }]}
              >
                <Select placeholder="Select subject">
                  <Option value="contact">Contact</Option>
                  <Option value="negotiation">Negotiation</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="w-full">
              <label className="text-base-color text-lg block mb-2">
                Notes
              </label>
              <Form.Item
                name="note"
                className="text-base-color text-base font-medium"
                rules={[{ required: true, message: "Notes are required" }]}
              >
                <TextArea
                  className="px-4 py-2 rounded-xl bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C]"
                  rows={4}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <RButton
                isLoading={false}
                loadingMessage={t("potentialsDealer.dddCommunicationLog")}
                type="submit"
                className="mt-5"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Communications;
