import { Button, ConfigProvider, Dropdown, Space, Tabs } from "antd";
import { useState } from "react";
import PageWrapper from "../../UI/PageWrapper";
import Communications from "./Communications";
import DealerAddModal from "./DealerAddModal";
import Dealers from "./Dealers";
import Overview from "./Overview";

const tabColors = ["#1d4ed8", "#1d4ed8", "#1d4ed8", "#1d4ed8"]; // Blue, Green, Amber, Violet

const tabKeys = ["overview", "dealers", "communications"];

const PotentialsDealer = () => {
  const [activeKey, setActiveKey] = useState("overview");

  const [isDealerAddModalOpen, setIsDealerAddModalOpen] = useState(false);

  const itemsss = [
    {
      key: "1",
      label: <span> 1230</span>,
    },
    {
      key: "2",
      label: <span> 1230</span>,
    },
    {
      key: "3",
      label: <span> 1230</span>,
    },
    {
      key: "4",
      label: <span> 1230</span>,
    },
  ];

  const getTabColor = (key) => {
    const index = tabKeys.indexOf(key) % tabColors.length;
    return tabColors[index];
  };

  const items = [
    {
      key: "overview",
      label: (
        <span
          className="custom-tab"
          style={{
            backgroundColor:
              activeKey === "overview"
                ? getTabColor("overview")
                : "transparent",
            color: activeKey === "overview" ? "#fff" : "#000",
          }}
        >
          Overview
        </span>
      ),
      children: <Overview />,
    },
    {
      key: "dealers",
      label: (
        <span
          className="custom-tab flex items-center gap-x-5"
          style={{
            backgroundColor:
              activeKey === "dealers" ? getTabColor("dealers") : "transparent",
            color: activeKey === "dealers" ? "#fff" : "#000",
          }}
        >
          Dealers
          <Dropdown
            menu={{
              items: itemsss,
            }}
          >
            <a>
              <Space>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                >
                  <path
                    d="M6.25 3.25013C5.91848 3.25013 5.60054 3.38183 5.36612 3.61625C5.1317 3.85067 5 4.16861 5 4.50013C5 4.83165 5.1317 5.1496 5.36612 5.38402C5.60054 5.61844 5.91848 5.75013 6.25 5.75013C6.58152 5.75013 6.89946 5.61844 7.13388 5.38402C7.3683 5.1496 7.5 4.83165 7.5 4.50013C7.5 4.16861 7.3683 3.85067 7.13388 3.61625C6.89946 3.38183 6.58152 3.25013 6.25 3.25013ZM2.7125 3.25013C2.97075 2.51822 3.44967 1.88443 4.08325 1.43612C4.71683 0.987815 5.47386 0.74707 6.25 0.74707C7.02614 0.74707 7.78317 0.987815 8.41675 1.43612C9.05033 1.88443 9.52925 2.51822 9.7875 3.25013H18.75C19.0815 3.25013 19.3995 3.38183 19.6339 3.61625C19.8683 3.85067 20 4.16861 20 4.50013C20 4.83165 19.8683 5.1496 19.6339 5.38402C19.3995 5.61844 19.0815 5.75013 18.75 5.75013H9.7875C9.52925 6.48205 9.05033 7.11584 8.41675 7.56415C7.78317 8.01245 7.02614 8.2532 6.25 8.2532C5.47386 8.2532 4.71683 8.01245 4.08325 7.56415C3.44967 7.11584 2.97075 6.48205 2.7125 5.75013H1.25C0.918479 5.75013 0.600537 5.61844 0.366117 5.38402C0.131696 5.1496 0 4.83165 0 4.50013C0 4.16861 0.131696 3.85067 0.366117 3.61625C0.600537 3.38183 0.918479 3.25013 1.25 3.25013H2.7125ZM13.75 10.7501C13.4185 10.7501 13.1005 10.8818 12.8661 11.1162C12.6317 11.3507 12.5 11.6686 12.5 12.0001C12.5 12.3317 12.6317 12.6496 12.8661 12.884C13.1005 13.1184 13.4185 13.2501 13.75 13.2501C14.0815 13.2501 14.3995 13.1184 14.6339 12.884C14.8683 12.6496 15 12.3317 15 12.0001C15 11.6686 14.8683 11.3507 14.6339 11.1162C14.3995 10.8818 14.0815 10.7501 13.75 10.7501ZM10.2125 10.7501C10.4708 10.0182 10.9497 9.38443 11.5833 8.93612C12.2168 8.48781 12.9739 8.24707 13.75 8.24707C14.5261 8.24707 15.2832 8.48781 15.9167 8.93612C16.5503 9.38443 17.0292 10.0182 17.2875 10.7501H18.75C19.0815 10.7501 19.3995 10.8818 19.6339 11.1162C19.8683 11.3507 20 11.6686 20 12.0001C20 12.3317 19.8683 12.6496 19.6339 12.884C19.3995 13.1184 19.0815 13.2501 18.75 13.2501H17.2875C17.0292 13.982 16.5503 14.6158 15.9167 15.0641C15.2832 15.5125 14.5261 15.7532 13.75 15.7532C12.9739 15.7532 12.2168 15.5125 11.5833 15.0641C10.9497 14.6158 10.4708 13.982 10.2125 13.2501H1.25C0.918479 13.2501 0.600537 13.1184 0.366117 12.884C0.131696 12.6496 0 12.3317 0 12.0001C0 11.6686 0.131696 11.3507 0.366117 11.1162C0.600537 10.8818 0.918479 10.7501 1.25 10.7501H10.2125ZM6.25 18.2501C5.91848 18.2501 5.60054 18.3818 5.36612 18.6162C5.1317 18.8507 5 19.1686 5 19.5001C5 19.8317 5.1317 20.1496 5.36612 20.384C5.60054 20.6184 5.91848 20.7501 6.25 20.7501C6.58152 20.7501 6.89946 20.6184 7.13388 20.384C7.3683 20.1496 7.5 19.8317 7.5 19.5001C7.5 19.1686 7.3683 18.8507 7.13388 18.6162C6.89946 18.3818 6.58152 18.2501 6.25 18.2501ZM2.7125 18.2501C2.97075 17.5182 3.44967 16.8844 4.08325 16.4361C4.71683 15.9878 5.47386 15.7471 6.25 15.7471C7.02614 15.7471 7.78317 15.9878 8.41675 16.4361C9.05033 16.8844 9.52925 17.5182 9.7875 18.2501H18.75C19.0815 18.2501 19.3995 18.3818 19.6339 18.6162C19.8683 18.8507 20 19.1686 20 19.5001C20 19.8317 19.8683 20.1496 19.6339 20.384C19.3995 20.6184 19.0815 20.7501 18.75 20.7501H9.7875C9.52925 21.482 9.05033 22.1158 8.41675 22.5641C7.78317 23.0125 7.02614 23.2532 6.25 23.2532C5.47386 23.2532 4.71683 23.0125 4.08325 22.5641C3.44967 22.1158 2.97075 21.482 2.7125 20.7501H1.25C0.918479 20.7501 0.600537 20.6184 0.366117 20.384C0.131696 20.1496 0 19.8317 0 19.5001C0 19.1686 0.131696 18.8507 0.366117 18.6162C0.600537 18.3818 0.918479 18.2501 1.25 18.2501H2.7125Z"
                    fill="#F3F3F3"
                  />
                </svg>
              </Space>
            </a>
          </Dropdown>
        </span>
      ),
      children: <Dealers />,
    },
    {
      key: "communications",
      label: (
        <span
          className="custom-tab"
          style={{
            backgroundColor:
              activeKey === "communications"
                ? getTabColor("communications")
                : "transparent",
            color: activeKey === "communications" ? "#fff" : "#000",
          }}
        >
          Communications
        </span>
      ),
      children: <Communications />,
    },
  ];

  return (
    <PageWrapper
      isSearch={false}
      pageTitle="Potentials Dealer"
      className="w-full"
    >
      <div className="relative">
        <div className="tabs-wrapper py-5">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  colorBgElevated: "#B7CDF5",
                  borderRadiusLG: 8,
                },
              },
            }}
          >
            <div className="py-5 flex items-start justify-between">
              <div>
                <Tabs
                  activeKey={activeKey}
                  onChange={setActiveKey}
                  items={items}
                  tabBarGutter={0}
                  tabBarStyle={{ borderBottom: "none" }}
                  className="custom-tabs"
                />
              </div>
            </div>
          </ConfigProvider>
        </div>
        {activeKey === "dealers" && (
          <div className="absolute right-0 top-10">
            <Button
              onClick={() => setIsDealerAddModalOpen(true)}
              className="w-[250px] h-11 rounded bg-[#185DDE] hover:!bg-[#185DDE] transition-colors duration-300 border-none !text-white text-lg font-normal hover:!border-none px-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M15.9999 5.66683C21.6975 5.66683 26.3333 10.3026 26.3333 16.0002C26.3333 21.6977 21.6975 26.3335 15.9999 26.3335C10.3024 26.3335 5.66659 21.6977 5.66659 16.0002C5.66659 10.3026 10.3024 5.66683 15.9999 5.66683ZM15.9999 3.0835C8.86604 3.0835 3.08325 8.86629 3.08325 16.0002C3.08325 23.134 8.86604 28.9168 15.9999 28.9168C23.1338 28.9168 28.9166 23.134 28.9166 16.0002C28.9166 8.86629 23.1338 3.0835 15.9999 3.0835ZM22.4583 14.7085H17.2916V9.54183H14.7083V14.7085H9.54159V17.2918H14.7083V22.4585H17.2916V17.2918H22.4583V14.7085Z"
                  fill="white"
                />
              </svg>
              Add Dealer
            </Button>
          </div>
        )}
      </div>

      <DealerAddModal
        isDealerAddModalOpen={isDealerAddModalOpen}
        setIsDealerAddModalOpen={setIsDealerAddModalOpen}
      />
    </PageWrapper>
  );
};

export default PotentialsDealer;
