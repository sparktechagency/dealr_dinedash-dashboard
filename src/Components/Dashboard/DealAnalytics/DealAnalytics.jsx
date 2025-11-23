import { ConfigProvider, Select } from "antd";
import { AnalyticsImage } from "../../../../public/images/AllImages";
import Bar_Chart from "../../Chart/BarChart";
import Line_Chart from "../../Chart/LineChart";
import PageWrapper from "../../UI/PageWrapper";
import { dealsRedeemedData } from "../Dealers/AllDealers";
import TopBarCard from "./TopBarCard";
import { useState } from "react";

const DealAnalytics = () => {
  const [year, setYear] = useState();

  return (
    <PageWrapper pageTitle="Deal Analytics" isSearch={false}>
      <div className="flex items-center justify-between w-full gap-x-6 mt-6">
        <TopBarCard
          title="Total Deals"
          image={AnalyticsImage.deals}
          count={"4163"}
          className="w-full bg-[#DCBCFF]"
          imageClass="size-[60px]"
        />
        <TopBarCard
          title="Redemptions"
          image={AnalyticsImage.redem}
          count={"6352"}
          className="w-full bg-[#F2EBB2]"
          imageClass="size-[60px]"
        />
        <TopBarCard
          title="Value Saved"
          image={AnalyticsImage.value}
          count={"€12,345"}
          className="w-full bg-[#B7CDF5]"
          imageClass="size-[60px]"
        />
        <TopBarCard
          title="Success Rate"
          image={AnalyticsImage.sucess}
          count={"89%"}
          className="w-full bg-[#84EDAA] "
          imageClass="size-[60px]"
        />
      </div>

      <div
        style={{
          boxShadow: "1px 1px 5px -3px black",
        }}
        className="my-10 border rounded-xl"
      >
        <p className="text-xl  font-semibold text-[#185DDE] p-4">
          Most Popular Deal Types
        </p>
        <Bar_Chart barCharData={dealsRedeemedData} />
      </div>

      <div
        style={{
          boxShadow: "1px 1px 5px -3px black",
        }}
        className="my-10 border rounded-xl"
      >
        <div className="flex items-center justify-between p-4">
          <p className="text-xl  font-semibold text-[#185DDE] ">
            Redemption Trends
          </p>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  fontSize: 16,
                  colorText: "#185DDE",
                  backgroundColor: "#185DDE",
                },
                Dropdown: {
                  colorBgElevated: "#185DDE",
                  backgroundColor: "#185DDE",
                },
              },
            }}
          >
            <Select
              onChange={(value) => setYear(value)}
              defaultValue={year}
              style={{ width: 150 }}
              options={[
                { value: "Daily", label: "Daily" },
                { value: "Weekly", label: "Weekly" },
                { value: "Monthly", label: "Monthly" },
                { value: "Yearly", label: "Yearly" },
              ]}
            />
          </ConfigProvider>
        </div>
        <Line_Chart isShow={false} />
      </div>
    </PageWrapper>
  );
};

export default DealAnalytics;
