/* eslint-disable react/prop-types */
import { Button, Pagination } from "antd";
import { useState } from "react";
import {
  useAllChangeRequestQuery,
  useApprovedDealMutation,
  useDeclinedDealRequestMutation,
} from "../../../Redux/api/deals/dealsApi";
import SpinLoader from "../../UI/SpinLoader";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { baseUrl } from "../../../constant/baseUrl";
import { formatDate } from "../../../utils/dateFormet";

const ChangeRequest = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const [approvedDeal] = useApprovedDealMutation();
  const [declinedDeal] = useDeclinedDealRequestMutation();

  const { data, isFetching } = useAllChangeRequestQuery({
    page,
    limit,
  });

  const changeRequests = data?.data?.attributes?.result || [];
  const totalChangeRequests =
    data?.data?.attributes?.pagination?.totalResults || 0;

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
    <div>
      <div className="relative">
        {changeRequests?.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                boxShadow: "1px 1px 5px -3px black",
              }}
              className="p-6 rounded-xl mt-3 border border-[#B6B6B6] w-[74vw]"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                {/* Left section: Image and details */}
                <div className="flex gap-4">
                  {/* Image */}
                  <img
                    src={baseUrl + item?.businessImage}
                    alt="Cafe Bistro"
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* Text content */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item?.businessname}
                    </h2>
                    <p className="text-gray-600">{item?.dealType}</p>

                    {/* 🔹 Deal Edit Request + Pending Badge */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-gray-800">
                        {item?.isDeleteReq
                          ? "Deal DeleteRequest"
                          : "Deal Edit Request"}
                      </span>
                      <span className="inline-block bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
              </div>

              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div>
                  {/* 🔹 Dealer’s Reason Box */}
                  <div className="mt-3 bg-[#DBDBDB] p-3 rounded-md text-gray-700">
                    <span className="font-semibold block mb-1">
                      Dealer&apos;s Reason:
                    </span>
                    <p className="w-[560px]">{item?.reason}</p>
                  </div>

                  {/* Benefit and Duration */}
                  <div className="mt-3 flex gap-8 text-gray-800">
                    <div className="flex flex-col">
                      <span className="font-semibold">Benefit:</span>{" "}
                      {item?.benefitAmount}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Duration:</span>{" "}
                      {item?.reusableAfter}
                    </div>
                  </div>

                  {/* 🔹 Submitted Date */}
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold">Submitted:</span>{" "}
                    {formatDate(item?.createdAt)}
                  </p>
                </div>

                <div className="flex flex-col gap-2 self-stretch justify-center -mt-16">
                  {/* <Button
                    onClick={() => {
                      setEditDealsModalOpen(true);
                      setCurrentRecord(item);
                    }}
                    className="bg-[#185DDE] h-10 rounded-2xl hover:!bg-[#185ddea3] !text-white"
                  >
                   
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M13 4.67157L16 7.67157M11 18.6716H19M3 14.6716L2 18.6716L6 17.6716L17.586 6.08557C17.9609 5.71052 18.1716 5.2019 18.1716 4.67157C18.1716 4.14124 17.9609 3.63263 17.586 3.25757L17.414 3.08557C17.0389 2.71063 16.5303 2.5 16 2.5C15.4697 2.5 14.9611 2.71063 14.586 3.08557L3 14.6716Z"
                        stroke="#F3F3F3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{" "}
                    Edit
                  </Button> */}

                  <Button
                    onClick={() => handleApprove(item._id)}
                    className="bg-[#16A34A] h-10 rounded-2xl hover:!bg-[#16a34a90] !text-white"
                  >
                    {/* ✅ Approve Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M3.4375 11.4375L7.8125 15.8125L16.5625 6.4375"
                        stroke="#F3F3F3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{" "}
                    Approve
                  </Button>

                  <Button
                    onClick={() => handleDecline(item._id)}
                    className="bg-[#DC2626] h-10 rounded-2xl hover:!bg-[#dc262690] !text-white"
                  >
                    {/* ❌ Reject Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.55827 5.05876C4.67546 4.94172 4.83431 4.87598 4.99994 4.87598C5.16556 4.87598 5.32442 4.94172 5.44161 5.05876L15.4416 15.0588C15.503 15.116 15.5523 15.185 15.5864 15.2616C15.6206 15.3383 15.6389 15.4211 15.6404 15.505C15.6419 15.5889 15.6265 15.6723 15.595 15.7501C15.5636 15.8279 15.5168 15.8986 15.4575 15.958C15.3981 16.0173 15.3274 16.0641 15.2496 16.0955C15.1718 16.127 15.0884 16.1424 15.0045 16.1409C14.9206 16.1394 14.8378 16.1211 14.7612 16.0869C14.6845 16.0528 14.6155 16.0035 14.5583 15.9421L4.55827 5.94209C4.44123 5.82491 4.37549 5.66605 4.37549 5.50043C4.37549 5.3348 4.44123 5.17595 4.55827 5.05876Z"
                        fill="#F3F3F3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.4417 5.05876C15.5587 5.17595 15.6245 5.3348 15.6245 5.50043C15.6245 5.66605 15.5587 5.82491 15.4417 5.94209L5.4417 15.9421C5.32322 16.0525 5.16652 16.1126 5.0046 16.1097C4.84268 16.1069 4.68819 16.0413 4.57368 15.9268C4.45917 15.8123 4.39358 15.6578 4.39072 15.4959C4.38787 15.3339 4.44797 15.1772 4.55837 15.0588L14.5584 5.05876C14.6756 4.94172 14.8344 4.87598 15 4.87598C15.1657 4.87598 15.3245 4.94172 15.4417 5.05876Z"
                        fill="#F3F3F3"
                      />
                    </svg>{" "}
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <div
          className={`my-6 py-5 bg-white sticky bottom-0 w-full z-[999] rounded-xl`}
        >
          <Pagination
            onChange={(value) => setPage(value)}
            pageSize={limit}
            total={totalChangeRequests}
            current={page}
            className="flex justify-end "
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeRequest;
