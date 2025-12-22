import { Button, ConfigProvider, Tabs } from "antd";
import { useState } from "react";
import PageWrapper from "../../UI/PageWrapper";
import Communications from "./Communications";
import DealerAddModal from "./DealerAddModal";
import Dealers from "./Dealers";
import { useTranslation } from "react-i18next";

const tabColors = ["#1d4ed8", "#1d4ed8", "#1d4ed8", "#1d4ed8"]; // Blue, Green, Amber, Violet

const tabKeys = ["dealers", "communications"];

const PotentialsDealer = () => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState("dealers");

  const [isDealerAddModalOpen, setIsDealerAddModalOpen] = useState(false);

  const getTabColor = (key) => {
    const index = tabKeys.indexOf(key) % tabColors.length;
    return tabColors[index];
  };

  const items = [
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
          {t("potentialsDealer.dealers")}
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
          {t("potentialsDealer.communication")}
        </span>
      ),
      children: <Communications />,
    },
  ];

  return (
    <PageWrapper
      isSearch={false}
      pageTitle={t("potentialsDealer.potentialsDealer")}
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
            <div className="py-5 flex items-start justify-between w-full">
              <div className="!w-full">
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
