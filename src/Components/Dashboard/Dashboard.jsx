/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AllIcons, DashboardIcons } from "../../../public/images/AllImages";
import {
  useGetCountsQuery,
  useGetDownloadsAndSubscriptionUsersQuery,
  useGetRatioOfUsersQuery,
} from "../../Redux/api/dashboard/dashboardApi";
import { useGetAllEarningQuery } from "../../Redux/api/payment/paymentApi";
import { useGetAllUsersQuery } from "../../Redux/api/user/userApi";
import Bar_Chart from "../Chart/BarChart";
import Spinner from "../Shared/Spinner";
import UsersTable from "../Tables/UsersTable";
import Line_Chart from "../Chart/LineChart";
import Area_Chart from "../Chart/AreaChart";
import { useTranslation } from "react-i18next";
import CountCard from "../UI/Dashboard/CountCard.Jsx";
import GrowthChart from "../Chart/GrowthChart";

const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearGrowth, setYearGrowth] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const { data: earning } = useGetAllEarningQuery({});
  const { t } = useTranslation();

  const [countFilter, setCountFilter] = useState("30d");

  const { data: counts, isLoading: loadingCounts } =
    useGetCountsQuery(countFilter);

  const allCounts = counts?.data?.attributes?.data;

  const { data: downloads, isLoading: loadingDownload } =
    useGetDownloadsAndSubscriptionUsersQuery(year);

  const allDownloads = downloads?.data?.attributes;

  const { data: getRatioOfUsers, isLoading: loadingRatio } =
    useGetRatioOfUsersQuery({
      year: yearGrowth,
    });

  console.log(getRatioOfUsers);
  const growth = getRatioOfUsers?.data?.attributes;

  const { data: users, isLoading: loading } = useGetAllUsersQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);

  if (loading || loadingRatio) {
    return (
      <div>
        <Spinner size={"large"} />
      </div>
    );
  }

  const totalEarnings = earning?.data?.result?.reduce(
    (total, earning) => total + earning.amount,
    0
  );

  return (
    <div className="w-full min-h-[90vh]">
      <div className="">
        <div className="py-5 px-8 bg-white rounded-xl border-2 border-[#185DDE]">
          <div className="flex items-end justify-end mb-10">
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
                onChange={(value) => setCountFilter(value)}
                style={{ width: 150 }}
                value={countFilter}
                options={[
                  { value: "7d", label: "Last 7 Days" },
                  { value: "30d", label: "Last 30 Days" },
                  { value: "year", label: "Last Year" },
                ]}
              />
            </ConfigProvider>
          </div>
          {/* Card Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5 justify-items-center">
            <CountCard
              title={t("dashboardCard.count")}
              image={DashboardIcons.download}
              count={allCounts?.totalUsers ?? 0}
            />

            <CountCard
              title={t("dashboardCard.activeSubcription")}
              image={DashboardIcons.active}
              count={allCounts?.activeSubscriptions ?? 0}
            />

            <CountCard
              title={t("dashboardCard.subscriptionRevenue")}
              image={DashboardIcons.revenue}
              count={allCounts?.totalEarning ?? 0}
            />

            <CountCard
              title={t("dashboardCard.conversationRate")}
              image={DashboardIcons.rate}
              count={`${allCounts?.conversionRate ?? 0}%`}
            />

            <CountCard
              title={t("dashboardCard.churnRate")}
              image={DashboardIcons.churn}
              count={`${allCounts?.churnRate ?? 0}%`}
            />

            <CountCard
              title={t("dashboardCard.activeUsers")}
              image={DashboardIcons.usersIcon}
              count={allCounts?.activeUsers ?? 0}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-10">
          <div className="flex flex-col lg:flex-row w-full h-[500px] gap-5 mt-8">
            <div className="w-full p-3 bg-[#FFFFFF] border-2 border-[#185DDE] rounded-xl flex flex-col">
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-2xl text-[#185DDE] sm:text-3xl font-bold">
                    {t("dashboardCard.downloadsvsSubscriptions")}
                  </p>
                  <div className="my-2">
                    <div>
                      <ul className="flex gap-10 ml-8 list-disc">
                        <li className="text-[#185DDE] text-2xl">
                          <span className="text-black text-xl">
                            {t("dashboardCard.downloads")}
                          </span>
                        </li>
                        <li className="text-[#B7CDF5] text-2xl">
                          <span className="text-black text-xl">
                            {t("dashboardCard.subscribers")}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
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
                      style={{ width: 80 }}
                      options={[
                        { value: "2025", label: "2025" },
                        { value: "2024", label: "2024" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <hr />
              <div className="">
                <Line_Chart allDownloads={allDownloads} />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full h-[500px] lg:flex-row gap-5 mt-8">
            <div className="w-full p-3 bg-[#FFFFFF] border-2 border-[#185DDE] rounded-xl flex flex-col">
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-2xl text-[#185DDE] sm:text-3xl font-bold">
                    {t("dashboardCard.growthTrends")}
                  </p>
                </div>
                <div>
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
                      onChange={(value) => setYearGrowth(value)}
                      defaultValue={year}
                      style={{ width: 80 }}
                      options={[
                        { value: "2025", label: "2025" },
                        { value: "2024", label: "2024" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>

              <div className="mt-20">
                <GrowthChart barCharData={growth} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col lg:flex-row gap-4 mt-5">
          <div className="bg-[#FFFFFF] flex-1 p-3 border-2 border-[#185DDE] rounded-xl">
            <div className="flex justify-between items-center mx-3 py-2">
              <p className="text-2xl font-semibold text-[#185DDE]">
                {t("dashboardCard.recentUsers")}
              </p>
            </div>
            <UsersTable data={users} loading={loading} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
