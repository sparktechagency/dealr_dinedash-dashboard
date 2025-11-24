import { Card, Space, Typography } from "antd";
// import { DashboardIcons } from "../../../../public/images/AllImages";
import mail from "../../../../public/images/dashboard-logo/mail.svg";
import call from "../../../../public/images/dashboard-logo/phone.svg";
// import CountCard from "../../UI/Dashboard/CountCard";
import {
  // useGetAllCommunicatrionStatusQuery,
  useGetCommunicatrionQuery,
} from "../../../Redux/api/potentialDealer/potentialDealerApi";
import SpinLoader from "../../UI/SpinLoader";

const { Title } = Typography;

const Overview = () => {
  // const { data: communicationStatus, isFetching: isFetchingStatus } =
  //   useGetAllCommunicatrionStatusQuery({});

  // const result = communicationStatus?.attributes?.result || [];

  const { data, isFetching } = useGetCommunicatrionQuery({});
  const potentialDealers = data?.data?.attributes?.result || [];

  if (isFetching) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }
  return (
    <div className="mt-3 !w-full">
      {/* <div className="grid grid-cols-3 gap-x-20 ">
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
      </div> */}

      <div
        style={{
          boxShadow: "1px 1px 11px -5px black",
        }}
        className="p-6 rounded-xl mt-10 border border-[#B6B6B6] !w-full"
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
          <Space
            direction="vertical"
            size="middle"
            style={{ display: "flex", marginTop: 16 }}
          >
            {potentialDealers.map((item) => (
              <Card
                key={item._id}
                className="border border-[#B6B6B6]"
                style={{ borderRadius: 8 }}
              >
                <div className="flex items-center gap-x-5">
                  <img src={item.contactType === "call" ? call : mail} />
                  <div>
                    <p className="text-2xl font-medium">
                      {item.contactType === "call" ? "Call" : "Email"}:{" "}
                      {item.subject.charAt(0).toUpperCase() +
                        item.subject.slice(1)}
                    </p>
                    <p>{item.pDealerId.businessName}</p>
                    <p>{item.note}</p>
                  </div>
                </div>
              </Card>
            ))}
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default Overview;
