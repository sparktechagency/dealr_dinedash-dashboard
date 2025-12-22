import { AnalyticsImage } from "../../../../public/images/AllImages";
import Bar_Chart from "../../Chart/BarChart";
import Line_Chart from "../../Chart/LineChart";
import PageWrapper from "../../UI/PageWrapper";
import TopBarCard from "./TopBarCard";
import { useState } from "react";
import {
  useAllDealCardsQuery,
  useAllRedemtionTrendQuery,
  useMostPopularDealsQuery,
} from "../../../Redux/api/deals/dealsApi";
import SpinLoader from "../../UI/SpinLoader";
import YearOption from "../../../utils/YearOption";
import { useTranslation } from "react-i18next";

const DealAnalytics = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, isFetching } = useAllDealCardsQuery({});
  const allCardData = data?.data?.attributes;

  const { data: popularDeals, isFetching: isFetchingDeals } =
    useMostPopularDealsQuery({});

  const { data: redemptionTrend } = useAllRedemtionTrendQuery({ year });

  if (isFetching || isFetchingDeals) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }

  return (
    <PageWrapper pageTitle={t("deals.dealAnalytics")} isSearch={false}>
      <div className="flex items-center justify-between w-full gap-x-6 mt-6">
        <TopBarCard
          title={t("deals.totalDeals")}
          image={AnalyticsImage.deals}
          count={allCardData?.totalDeals}
          className="w-full bg-[#DCBCFF]"
          imageClass="size-[60px]"
        />
        <TopBarCard
          title={t("deals.redemptions")}
          image={AnalyticsImage.redem}
          count={allCardData?.redeemCount}
          className="w-full bg-[#F2EBB2]"
          imageClass="size-[60px]"
        />
        <TopBarCard
          title={t("deals.valueSaved")}
          image={AnalyticsImage.value}
          count={`${allCardData?.valueSaved}%`}
          className="w-full bg-[#B7CDF5]"
          imageClass="size-[60px]"
        />
        <TopBarCard
          title={t("deals.successRate")}
          image={AnalyticsImage.sucess}
          count={`${allCardData?.successRate}%`}
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
          {t("deals.mostPopularDealTypes")}
        </p>
        <Bar_Chart barCharData={popularDeals?.data?.attributes} />
      </div>

      <div
        style={{
          boxShadow: "1px 1px 5px -3px black",
        }}
        className="my-10 border rounded-xl"
      >
        <div className="flex items-center justify-between p-4">
          <p className="text-xl  font-semibold text-[#185DDE] ">
            {t("deals.redemptionTrends")}
          </p>
          <div className="flex items-center gap-2">
            <div>
              <YearOption currentYear={currentYear} setThisYear={setYear} />
            </div>
          </div>
        </div>
        <Line_Chart
          lineChartData={redemptionTrend?.data?.attributes}
          isShow={false}
        />
      </div>
    </PageWrapper>
  );
};

export default DealAnalytics;
