import { Button, Pagination, Rate } from "antd";
import PropTypes from "prop-types";
import { useAllApprovedDealQuery } from "../../../Redux/api/deals/dealsApi";
import { useState } from "react";
import { baseUrl } from "../../../constant/baseUrl";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAvTimer } from "react-icons/md";
import SpinLoader from "../../UI/SpinLoader";

const AllDealsTab = ({
  isDealAddModalOpen,
  setEditDealsModalOpen,
  editDealsModalOpen,
  setDeleteDealsModalOpen,
  deleteDealsModalOpen,
  setCurrentRecord,
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useAllApprovedDealQuery({ page, limit });

  const allDeals = data?.data?.attributes?.result || [];
  const totalDeals = data?.data?.attributes?.pagination?.totalResults || 0;

  const serverUrl = baseUrl;

  if (isFetching) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }
  return (
    <div className="mt-3 h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-baseline gap-6 w-full">
        {allDeals?.map((item, index) => {
          // Inside your map loop, for each 'item'
          const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
          const todayDay = days[todayIndex];

          // Find today's opening hours
          const todayHours = item.openingHours?.find((h) => h.day === todayDay);

          let openTime =
            `${todayHours?.openingTime || "0"} - ${
              todayHours?.closingTime || "0"
            }` || "";

          return (
            <div key={index} className="rounded-xl shadow-lg !w-full">
              <div className="relative  !w-full">
                <img
                  src={serverUrl + item?.businessImage}
                  alt={item?.businessName}
                  className="w-full !h-56 object-cover rounded-tr-xl rounded-tl-xl"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    onClick={() => {
                      setEditDealsModalOpen(true);
                      setCurrentRecord(item);
                    }}
                    className="p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect width="24" height="24" rx="6" fill="#F3F3F3" />
                      <path
                        d="M15 6.17157L18 9.17157M13 20.1716H21M5 16.1716L4 20.1716L8 19.1716L19.586 7.58557C19.9609 7.21052 20.1716 6.7019 20.1716 6.17157C20.1716 5.64124 19.9609 5.13263 19.586 4.75757L19.414 4.58557C19.0389 4.21063 18.5303 4 18 4C17.4697 4 16.9611 4.21063 16.586 4.58557L5 16.1716Z"
                        stroke="#185DDE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteDealsModalOpen(true);
                      setCurrentRecord(item);
                    }}
                    className="p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect width="24" height="24" rx="6" fill="#F3F3F3" />
                      <path
                        d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                        fill="#C50000"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className=" border border-[#185DDE] rounded-br-xl bg-[#E8EFFC] rounded-bl-xl border-t-0 !w-full">
                <div className="flex justify-between items-start p-4">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">
                      {item?.businessname}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Rate disabled value={item?.rating} /> (
                      {item?.user_ratings_total})
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      Price Range : €{item?.minPrice}-€{item?.maxPrice}
                    </p>
                    <p>Open Time : {openTime}</p>
                  </div>
                </div>

                {/* Benefit Tag */}
                <div className="mt-4 flex items-start justify-between">
                  <div className="border border-[#185DDE] w-full"></div>
                  <span className="block !w-fit text-nowrap -mt-5 px-4 py-3 bg-[#185DDE] text-white text-sm rounded-full font-medium">
                    {item?.benefitAmount} € Benefit
                  </span>
                  <div className="border border-[#185DDE] w-full"></div>
                </div>

                {/* Offer */}
                <div className="mt-4 p-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    {item?.dealType}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {item?.description}
                  </p>
                </div>

                {/* Bottom Info */}
                <div className="flex justify-between items-center mt-4 border-t p-4 gap-4">
                  <div className="flex items-center gap-1">
                    <MdOutlineAvTimer className="text-[#1d4ed8] size-8" />
                    <div className="flex flex-col text-sm text-gray-600 text-nowrap">
                      <strong>Reusable After</strong>
                      <p>{item?.reusableAfter}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaLocationDot className="text-[#1d4ed8] size-5" />
                    <div className="flex flex-col text-sm text-gray-600">
                      <strong>LOCATION</strong>
                      <p>{item?.businessAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${
          isDealAddModalOpen || editDealsModalOpen || deleteDealsModalOpen
            ? "z-0"
            : " z-[9999]"
        } my-6 py-5 bg-white sticky bottom-0 w-full`}
      >
        <Pagination
          onChange={(page) => setPage(page)}
          total={totalDeals}
          pageSize={limit}
          current={page}
          className="flex justify-end "
        />
      </div>
    </div>
  );
};

AllDealsTab.propTypes = {
  isDealAddModalOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  setEditDealsModalOpen: PropTypes.func.isRequired,
  editDealsModalOpen: PropTypes.bool.isRequired,
  setDeleteDealsModalOpen: PropTypes.func.isRequired,
  deleteDealsModalOpen: PropTypes.bool.isRequired,
  setCurrentRecord: PropTypes.func.isRequired,
};
export default AllDealsTab;
