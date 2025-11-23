import { Card, Image, Space, Typography } from "antd";
import { DashboardIcons } from "../../../../public/images/AllImages";
import mail from "../../../../public/images/dashboard-logo/mail.svg";
import call from "../../../../public/images/dashboard-logo/phone.svg";
import CountCard from "../../UI/Dashboard/CountCard";

const { Title } = Typography;

const Overview = () => {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-3 gap-x-20 ">
        <CountCard
          title="Total Downloads"
          image={DashboardIcons.download}
          count={"12,500"}
          className="w-full"
          imageClass="size-[90px]"
        />
        <CountCard
          title="Active Subscriptions"
          image={DashboardIcons.active}
          count={"780"}
          className="w-full"
          imageClass="size-[90px]"
        />
        <CountCard
          title="Subscription Revenue"
          image={DashboardIcons.revenue}
          count={"225,000"}
          className="w-full"
          imageClass="size-[90px]"
        />
      </div>

      <div
        style={{
          boxShadow: "1px 1px 11px -5px black",
        }}
        className="p-6 rounded-xl mt-10 border border-[#B6B6B6]"
      >
        <Title level={2}>Recent Activity</Title>
        <p className="text-lg font-normal">
          Latest dealer interactions and updates
        </p>

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

export default Overview;
