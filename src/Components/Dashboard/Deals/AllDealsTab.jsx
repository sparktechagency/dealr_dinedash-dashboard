import { Button, Pagination } from "antd";
import image from "../../../../public/images/deals.jpg";

const AllDealsTab = ({
  isDealAddModalOpen,
  handleCancel,
  setEditDealsModalOpen,
  editDealsModalOpen,
  setDeleteDealsModalOpen,
  deleteDealsModalOpen,
}) => {
  return (
    <div className="mt-3 h-screen">
      <div className="grid grid-cols-2 gap-6 px-28">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index} className="rounded-xl shadow-lg">
              <div className="relative h-56">
                <img
                  src={image}
                  alt="The Rio Lounge"
                  className="w-full !h-56 object-cover rounded-tr-xl rounded-tl-xl"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    onClick={() => setEditDealsModalOpen(true)}
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
                    onClick={() => setDeleteDealsModalOpen(true)}
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
              <div className=" border border-[#185DDE] rounded-br-xl bg-[#E8EFFC] rounded-bl-xl border-t-0">
                <div className="flex justify-between items-start p-4">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">
                      The Rio Lounge
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400 text-sm">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star text-gray-300"></i>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">(120)</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>Price Range : €50-5000</p>
                    <p>Open Time : 9 AM - 10 PM</p>
                  </div>
                </div>

                {/* Benefit Tag */}
                <div className="mt-4 flex items-start justify-between">
                  <div className="border border-[#185DDE] w-full"></div>
                  <span className="block !w-[220px] -mt-5 px-4 py-3 bg-[#185DDE] text-white text-sm rounded-full font-medium">
                    6 € Benefit
                  </span>
                  <div className="border border-[#185DDE] w-full"></div>
                </div>

                {/* Offer */}
                <div className="mt-4 p-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    Free cold drinks
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Lorem ipsum dolor sit amet consectetur. Rhoncus molestie
                    amet non pellentesque.
                  </p>
                </div>

                {/* Bottom Info */}
                <div className="flex justify-between items-center mt-4 border-t p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-clock text-blue-500"></i>
                    <span>
                      <strong>60 Days</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-location-dot text-[#185DDE]"></i>
                    <span>
                      <strong>LOCATION</strong> Gulshan 2.
                    </span>
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
          //   onChange={(value) => setCurrentPage(value)}
          pageSize={12}
          total={60}
          className="flex justify-end "
        />
      </div>
    </div>
  );
};

export default AllDealsTab;
