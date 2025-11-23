import { Card, Form, Image, Input, Space, Typography } from "antd";
import mail from "../../../../public/images/dashboard-logo/mail.svg";
import call from "../../../../public/images/dashboard-logo/phone.svg";
import TextArea from "antd/es/input/TextArea";
import RButton from "../../../ui/RButton";

const { Title } = Typography;

const Communications = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <div
        style={{
          boxShadow: "1px 1px 11px -5px black",
        }}
        className="p-6 rounded-xl mt-3 border border-[#B6B6B6]  w-[77vw]"
      >
        <Title level={2}>Recent Communications</Title>
        <p className="text-lg font-normal">Latest dealer interactions</p>

        <div className="px-6 py-8">
          <Form
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
                  name="email"
                  className="text-base-color text-base font-medium"
                  rules={[
                    {
                      required: true,
                      message: "Name is Required",
                    },
                  ]}
                >
                  <Input className="px-4 py-2 rounded-xl bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
                </Form.Item>
              </div>

              <div className="w-full">
                <label className="text-base-color text-lg block mb-2">
                  Contact Type
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
                  <Input className="px-4 py-2 rounded-xl bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
                </Form.Item>
              </div>
            </div>

            <div className="w-full">
              <label className="text-base-color text-lg block mb-2">
                Subject
              </label>
              <Form.Item
                name="email"
                className="text-base-color text-base font-medium"
              >
                <Input className="px-4 py-2 rounded-xl bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none" />
              </Form.Item>
            </div>

            <div className="w-full">
              <label className="text-base-color text-lg block mb-2">
                Notes
              </label>
              <Form.Item
                name="email"
                className="text-base-color text-base font-medium"
              >
                <TextArea
                  className="px-4 py-2 rounded-xl bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none"
                  rows={4}
                />
              </Form.Item>
            </div>
            <Form.Item>
              <RButton
                isLoading={false}
                loadingMessage="Add Communication Log"
                type={"submit"}
                className="mt-5"
              />
            </Form.Item>
          </Form>
        </div>

        <Space
          direction="vertical"
          size="middle"
          style={{ display: "flex", marginTop: 16 }}
        >
          {/* Activity Card 1 */}
          <Card className="border border-[#B6B6B6]" style={{ borderRadius: 8 }}>
            <div className="flex items-center gap-x-5">
              <Image src={call} />
              <div>
                <p className="text-2xl font-medium ">
                  Initial consultation call
                </p>
                <p>AutoMax Solutions</p>
                <p>
                  Discussed pricing and implementation timeline. Very positive
                  response.
                </p>
              </div>
            </div>
          </Card>

          {/* Activity Card 2 */}
          <Card className="border border-[#B6B6B6]" style={{ borderRadius: 8 }}>
            <div className="flex items-center gap-x-5">
              <Image src={mail} />
              <div>
                <p className="text-2xl font-medium">Follow-up proposal</p>
                <p>AutoMax Solutions</p>
                <p>Sent detailed proposal with pricing breakdown.</p>
              </div>
            </div>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default Communications;
