/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AllIcons, DashboardIcons } from "../../../public/images/AllImages";
import { useGetRatioOfUsersQuery } from "../../Redux/api/dashboard/dashboardApi";
import { useGetAllEarningQuery } from "../../Redux/api/payment/paymentApi";
import { useGetAllUsersQuery } from "../../Redux/api/user/userApi";
import Bar_Chart from "../Chart/BarChart";
import Spinner from "../Shared/Spinner";
import UsersTable from "../Tables/UsersTable";
import Line_Chart from "../Chart/LineChart";
import CountCard from "../UI/Dashboard/CountCard";
import Area_Chart from "../Chart/AreaChart";
import { useTranslation } from "react-i18next";

// import Line_Chart from "../Chart/LineChart";
const barCharData = [
  {
    month: "Jan",
    uv: 4000,
    pv: 2400,
  },
  {
    month: "Feb",
    uv: 3000,
    pv: 1398,
  },
  {
    month: "Mar",
    uv: 2000,
    pv: 9800,
  },
  {
    month: "Apr",
    uv: 2780,
    pv: 3908,
  },
  {
    month: "May",
    uv: 1890,
    pv: 4800,
  },
  {
    month: "Jun",
    uv: 2390,
    pv: 3800,
  },
  {
    month: "Jul",
    uv: 3490,
    pv: 4300,
  },
  {
    month: "Aug",
    uv: 4000,
    pv: 2400,
  },
  {
    month: "Sep",
    uv: 3000,
    pv: 1398,
  },
  {
    month: "Oct",
    uv: 2000,
    pv: 9800,
  },
  {
    month: "Nov",
    uv: 2780,
    pv: 3908,
  },
  {
    month: "Dec",
    uv: 1890,
    pv: 4800,
  },
];
const Dashboard = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const { data: earning } = useGetAllEarningQuery({});
  const { t } = useTranslation();

  const { data: getRatioOfUsers, isLoading: loadingRatio } =
    useGetRatioOfUsersQuery({
      year: year,
    });

  const { data: users, isLoading: loading } = useGetAllUsersQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);

  // useEffect(() => {
  //   if (token === null) {
  //     navigate("signin");
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    if (getRatioOfUsers) {
      setBarChartData(getRatioOfUsers?.data);
    }
  }, [getRatioOfUsers, year]);

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
      <div>
        {/* Card Items */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5 justify-items-center py-5 px-8 bg-white rounded-xl border-2 border-[#185DDE]">
          <CountCard
            title={t("dashboardCard.count")}
            image={DashboardIcons.download}
            count={"12,500"}
          />
          <CountCard
            title={t("dashboardCard.activeSubcription")}
            image={DashboardIcons.active}
            count={"780"}
          />
          <CountCard
            title={t("dashboardCard.subscriptionRevenue")}
            image={DashboardIcons.revenue}
            count={"225,000"}
          />
          <CountCard
            title={t("dashboardCard.conversationRate")}
            image={DashboardIcons.rate}
            count={"22.4%"}
          />
          <CountCard
            title={t("dashboardCard.churnRate")}
            image={DashboardIcons.churn}
            count={"5.2%"}
          />
          <CountCard
            title={t("dashboardCard.activeUsers")}
            image={DashboardIcons.usersIcon}
            count={"9,500"}
          />
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
                <Line_Chart />
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

              <div className="mt-20">
                <Bar_Chart barCharData={barCharData} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col w-full h-[500px] lg:flex-row gap-5 mt-8">
            <div className="w-full p-3 bg-[#FFFFFF] border-2 border-[#185DDE] rounded-xl flex flex-col">
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-2xl text-[#185DDE] sm:text-3xl font-bold">
                    {t("dashboardCard.yeartoDatePerformance")}
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
              <div className="mt-20">
                <Area_Chart />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-5">
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
