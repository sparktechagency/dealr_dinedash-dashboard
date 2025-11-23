/* eslint-disable no-unused-vars */
import { ConfigProvider, Pagination, Select } from "antd";
import { useState } from "react";
import { useGetAllRecipeQuery } from "../../../Redux/api/driver/recipe";
import Bar_Chart from "../../Chart/BarChart";
import DealerTable from "../../Tables/DealerTable";
import PageWrapper from "../../UI/PageWrapper";
import DealerActionModal from "./DealerActionModal";
import DealerEditModal from "./DealerEditModal";
import DealerViewModal from "./DealerViewModal";

export const dealsRedeemedData = [
  {
    month: "The Rio Lounge",
    uv: 2200,
  },
  {
    month: "Lounge Comida",
    uv: 2700,
  },
  {
    month: "Chef’s Table",
    uv: 4200,
  },
  {
    month: "Pinewood Cafe",
    uv: 4800,
  },
  {
    month: "Yum Cha District",
    uv: 2300,
  },
  {
    month: "Izumi Japanese Ki...",
    uv: 5100,
  },
  {
    month: "Cafe de Ontario",
    uv: 2600,
  },
];

const AllDealers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchText, setSearchText] = useState("");

  const { data: allRecipes, isLoading } = useGetAllRecipeQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);

  const onSearch = (value) => setSearchText(value);

  const [currentRecord, setCurrentRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCancel = () => {
    setIsViewModalOpen(false);
    setActionModal(false);
    setIsEditModalOpen(false);
    setCurrentRecord(null);
  };

  return (
    <PageWrapper
      searchText={searchText}
      onSearch={onSearch}
      pageTitle="Dealers List"
    >
      <div
        style={{
          boxShadow: "1px 1px 11px -5px black",
        }}
        className="my-10 border rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <p className="text-[#185DDE] font-semibold text-xl">
            Deals redeemed per Dealer
          </p>
          <div className="space-y-2">
            <p className="font-medium">Short by Performance:</p>
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
                // onChange={(value) => setYear(value)}
                defaultValue={"topTopBottom"}
                style={{
                  width: 150,
                }}
                options={[
                  { value: "topTopBottom", label: "Top to Bottom" },
                  { value: "bottomToTop", label: "Bottom to Top" },
                ]}
              />
            </ConfigProvider>
          </div>
        </div>
        <Bar_Chart barCharData={dealsRedeemedData} className="!h-96" />
      </div>

      <div
        style={{
          boxShadow: "1px 1px 11px -5px black",
        }}
        className="mb-10"
      >
        <DealerTable
          setActionModal={setActionModal}
          setIsViewModalOpen={setIsViewModalOpen}
          setCurrentRecord={setCurrentRecord}
        />

        <DealerActionModal
          isModalOpen={actionModal}
          handleCancel={handleCancel}
        />

        <DealerViewModal
          isViewModalOpen={isViewModalOpen}
          setIsViewModalOpen={setIsViewModalOpen}
          currentRecord={currentRecord}
          setIsEditModalOpen={setIsEditModalOpen}
          handleCancel={handleCancel}
        />

        <DealerEditModal
          isEditModalOpen={isEditModalOpen}
          setIsViewModalOpen={setIsViewModalOpen}
          handleCancel={handleCancel}
        />

        <div className="my-6 pb-10">
          <Pagination
            onChange={(value) => setCurrentPage(value)}
            pageSize={10}
            total={50}
            className="flex justify-end "
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AllDealers;
