import { Button, ConfigProvider, Tabs } from "antd";
import { useState } from "react";
import PageWrapper from "../../UI/PageWrapper";
import AllDealsTab from "./AllDealsTab";
import ChangeRequest from "./ChangeRequest";
import DealApproval from "./DealApproval";
import CreateDealModal from "./CreateDealModal";
import EditDealModal from "./EditDealModal";
import DeleteDealsModal from "./DeleteDealsModal";

const tabColors = ["#1d4ed8", "#1d4ed8", "#1d4ed8", "#1d4ed8"]; // Blue, Green, Amber, Violet

const tabKeys = ["allDeals", "dealApproval", "changeRequest"];

const AllDeals = () => {
  const [activeKey, setActiveKey] = useState("allDeals");

  const [isDealAddModalOpen, setIsDealAddModalOpen] = useState(false);
  const [editDealsModalOpen, setEditDealsModalOpen] = useState(false);
  const [deleteDealsModalOpen, setDeleteDealsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleCancel = () => {
    setIsDealAddModalOpen(false);
    setDeleteDealsModalOpen(false);
    setEditDealsModalOpen(false);
    setCurrentRecord(null);
  };

  const getTabColor = (key) => {
    const index = tabKeys.indexOf(key) % tabColors.length;
    return tabColors[index];
  };

  const items = [
    {
      key: "allDeals",
      label: (
        <span
          className="custom-tab"
          style={{
            backgroundColor:
              activeKey === "allDeals"
                ? getTabColor("allDeals")
                : "transparent",
            color: activeKey === "allDeals" ? "#fff" : "#000",
          }}
        >
          All Deals
        </span>
      ),
      children: (
        <>
          <AllDealsTab
            handleCancel={handleCancel}
            isDealAddModalOpen={isDealAddModalOpen}
            setEditDealsModalOpen={setEditDealsModalOpen}
            editDealsModalOpen={editDealsModalOpen}
            setDeleteDealsModalOpen={setDeleteDealsModalOpen}
            deleteDealsModalOpen={deleteDealsModalOpen}
            setCurrentRecord={setCurrentRecord}
          />

          <CreateDealModal
            isDealAddModalOpen={isDealAddModalOpen}
            handleCancel={handleCancel}
          />

          <EditDealModal
            editDealsModalOpen={editDealsModalOpen}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />

          <DeleteDealsModal
            deleteDealsModalOpen={deleteDealsModalOpen}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </>
      ),
    },
    {
      key: "dealApproval",
      label: (
        <span
          className="custom-tab"
          style={{
            backgroundColor:
              activeKey === "dealApproval"
                ? getTabColor("dealApproval")
                : "transparent",
            color: activeKey === "dealApproval" ? "#fff" : "#000",
          }}
        >
          Deal Approval
        </span>
      ),
      children: (
        <>
          <DealApproval
            setEditDealsModalOpen={setEditDealsModalOpen}
            setCurrentRecord={setCurrentRecord}
          />{" "}
          <EditDealModal
            editDealsModalOpen={editDealsModalOpen}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </>
      ),
    },
    {
      key: "changeRequest",
      label: (
        <span
          className="custom-tab"
          style={{
            backgroundColor:
              activeKey === "changeRequest"
                ? getTabColor("changeRequest")
                : "transparent",
            color: activeKey === "changeRequest" ? "#fff" : "#000",
          }}
        >
          Change Request
        </span>
      ),
      children: (
        <>
          <ChangeRequest
            setEditDealsModalOpen={setEditDealsModalOpen}
            setCurrentRecord={setCurrentRecord}
          />{" "}
          <EditDealModal
            editDealsModalOpen={editDealsModalOpen}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </>
      ),
    },
  ];

  return (
    <PageWrapper pageTitle="All Deals">
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
            <div className="py-5">
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
        {activeKey === "allDeals" && (
          <div className="absolute right-0 top-10">
            <Button
              onClick={() => setIsDealAddModalOpen(true)}
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
              Create New Deal
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AllDeals;
