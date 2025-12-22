/* eslint-disable react/prop-types */
import { Button, Pagination } from "antd";
import image from "../../../../public/images/deals.jpg";
import {
  useAllPendingDealQuery,
  useApprovedDealMutation,
  useDeclinedDealRequestMutation,
} from "../../../Redux/api/deals/dealsApi";
import { useState } from "react";
import SpinLoader from "../../UI/SpinLoader";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useTranslation } from "react-i18next";

const DealApproval = ({ setEditDealsModalOpen, setCurrentRecord }) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const limit = 12;

  const [approvedDeal] = useApprovedDealMutation();
  const [declinedDeal] = useDeclinedDealRequestMutation();

  const { data, isFetching } = useAllPendingDealQuery({
    page,
    limit,
  });

  const allPendingDeals = data?.data?.attributes?.result || [];
  const totalDeals = data?.data?.attributes?.pagination?.totalResults || 0;

  if (isFetching) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }

  const handleApprove = async (id) => {
    await tryCatchWrapper(
      approvedDeal,
      { params: id },
      "Updating Deal Request..."
    );
  };

  const handleDecline = async (id) => {
    await tryCatchWrapper(
      declinedDeal,
      { params: id },
      "Deleting Deal Request..."
    );
  };

  return (
    <div className="relative">
      {allPendingDeals.map((item, index) => {
        return (
          <div
            key={index}
            style={{ boxShadow: "1px 1px 5px -3px black" }}
            className="p-6 rounded-xl mt-3 border border-[#B6B6B6] w-[74vw]"
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              {/* Left section: Image and details */}
              <div className="flex gap-4">
                {/* Image */}
                <img
                  src={item?.businessImage || image}
                  alt={item?.businessname}
                  className="w-16 h-16 rounded-full object-cover"
                />

                {/* Text content */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item?.businessname}
                  </h2>
                  <p className="text-gray-600">{item?.dealType}</p>
                  <span className="inline-block bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full mt-1 font-medium">
                    {item?.approvalStatus}
                  </span>
                  <p className="mt-2 text-gray-700">{item?.description}</p>

                  {/* Benefit and Duration */}
                  <div className="mt-3 flex flex-col gap-1 text-gray-800">
                    <div className="flex gap-8">
                      <div className="flex flex-col">
                        <span className="font-semibold">Benefit:</span>{" "}
                        {item?.benefitAmount}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Reusable After:</span>{" "}
                        {item?.reusableAfter} Days
                      </div>
                    </div>

                    {/* All Opening Hours */}
                    <div className="mt-2">
                      <span className="font-semibold">Opening Hours:</span>
                      <ul className="ml-2 mt-1">
                        {item?.openingHours?.map((day) => (
                          <li key={day._id} className="text-gray-600 text-sm">
                            {day.day}:{" "}
                            {day.isOpen
                              ? `${day.openingTime} - ${day.closingTime}`
                              : "Closed"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 self-stretch justify-center">
                <Button
                  onClick={() => {
                    setEditDealsModalOpen(true);
                    setCurrentRecord(item);
                  }}
                  className="bg-[#185DDE] h-10 rounded-2xl hover:!bg-[#185ddea3] !text-white"
                >
                  {t("deals.edit")}
                </Button>
                <Button
                  onClick={() => handleApprove(item?._id)}
                  className="bg-[#16A34A] h-10 rounded-2xl hover:!bg-[#16a34a90] !text-white"
                >
                  {t("deals.approve")}
                </Button>
                <Button
                  onClick={() => handleDecline(item?._id)}
                  className="bg-[#DC2626] h-10 rounded-2xl hover:!bg-[#dc262690] !text-white"
                >
                  {t("deals.reject")}
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className={`my-6 py-5 bg-white sticky bottom-0 w-full z-[999]`}>
        <Pagination
          currentPage={page}
          pageSize={limit}
          onPageChange={(page) => setPage(page)}
          total={totalDeals}
          className="flex justify-end "
        />
      </div>
    </div>
  );
};

export default DealApproval;
