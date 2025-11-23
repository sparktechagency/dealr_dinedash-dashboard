import { useState } from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import EarningTable from "../Tables/EarningTable";
import ViewEarningModal from "../UI/ViewEarningModal";
import { Pagination } from "antd";
import { useGetTransactionQuery } from "../../Redux/api/transaction/transactionApi.js";

export default function Earning() {
  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading } = useGetTransactionQuery({
    page: currentPage,
    limit: pageSize,
  });

  const allEarnings = data?.data?.attributes?.transactions || [];
  const totalEarnings = data?.data?.attributes?.pagination?.totalResults || 0;

  const totalAllEarnings = data?.data?.attributes?.totalEarnings || 0;
  const todaysEarnings = data?.data?.attributes?.todaysEarnings || 0;

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded-xl border-2 border-[#185DDE]">
        <h1 className="text-3xl font-medium rounded-t-lg p-5  bg-[#185DDE] text-white">
          Earning
        </h1>

        <div className="p-6">
          <div className="flex items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center justify-center gap-3 bg-[#185DDE] text-primary-color py-3 lg:w-[300px] rounded-xl">
                <LuArrowLeftRight className="text-xl" />
                <h1 className="text-lg">Today’s Earning</h1>
                <h1>${todaysEarnings || 0}</h1>
              </div>
              <div className="flex items-center justify-center gap-3 bg-[#185DDE] text-primary-color py-3 lg:w-[300px] rounded-xl">
                <LuArrowLeftRight className="text-xl" />
                <h1 className="text-lg">All Earning</h1>
                <h1>${totalAllEarnings || 0}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 lg:px-6">
          <EarningTable
            page={currentPage}
            limit={pageSize}
            data={allEarnings}
            loading={isLoading}
            showViewModal={showViewModal}
          />

          <div className="py-6 flex items-center justify-end">
            <Pagination
              onChange={(value) => setCurrentPage(value)}
              current={currentPage}
              pageSize={pageSize}
              total={totalEarnings}
              showSizeChanger={false}
            />
          </div>
        </div>

        <ViewEarningModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
}
