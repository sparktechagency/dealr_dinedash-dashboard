import { Button, Card, Space, Typography } from "antd";
import {
  useGetPotentialDealerQuery,
  useMakeDealerFromPotentialMutation,
} from "../../../Redux/api/potentialDealer/potentialDealerApi";
import SpinLoader from "../../UI/SpinLoader";
import { useState } from "react";
import DealersAllComunicationModal from "./DealersAllComunicationModal";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
const { Title } = Typography;

const Dealers = () => {
  const [makeDealer] = useMakeDealerFromPotentialMutation();
  const [isShowCommunicationModal, setIsShowCommunicationModal] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showCommunicationModal = (record) => {
    setIsShowCommunicationModal(true);
    setCurrentRecord(record);
    console.log("record", record);
  };

  const handleCancel = () => {
    setIsShowCommunicationModal(false);
    setCurrentRecord(null);
  };

  const { data, isFetching } = useGetPotentialDealerQuery({});
  const potentialDealers = data?.data?.attributes?.result || [];

  const onFinish = async (id) => {
    await tryCatchWrapper(makeDealer, { params: id }, "Creating New Dealer...");
  };

  if (isFetching)
    return (
      <div>
        <SpinLoader />
      </div>
    );
  return (
    <div
      style={{ boxShadow: "1px 1px 11px -5px black" }}
      className="p-6 rounded-xl mt-3 border border-[#B6B6B6] w-[76vw]"
    >
      <Title level={2}>Dealer Directory</Title>
      <p className="text-lg font-normal">
        Manage your potential dealer relationships
      </p>

      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", marginTop: 16 }}
      >
        {potentialDealers?.map((dealer) => (
          <Card
            key={dealer?._id}
            className="border border-[#B6B6B6]"
            style={{ borderRadius: 8 }}
          >
            <div>
              <div className="flex items-center justify-between gap-x-5">
                <div>
                  <div className="flex items-center gap-x-4 mb-3">
                    <p className="text-2xl font-medium">
                      {dealer?.businessName}
                    </p>
                    <p
                      className="px-2 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor:
                          dealer?.acquisitionStatus === "Negotiating"
                            ? "#FFDF00"
                            : "#90EE90",
                        color:
                          dealer?.acquisitionStatus === "Negotiating"
                            ? "#735900"
                            : "#056608",
                      }}
                    >
                      {dealer?.acquisitionStatus}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-10">
                    <div className="flex flex-col gap-x-5 space-y-2">
                      <p className="text-lg flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{dealer?.email}</span>
                      </p>

                      <p className="text-lg flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{dealer.detialsAddress}</span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-x-5 space-y-2">
                      <p className="text-lg flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{dealer.contactPerson}</span>
                      </p>
                      <p className="text-lg flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 2C9.43223 4.69615 8 8.27674 8 12C8 15.7233 9.43223 19.3038 12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2Z"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12H22"
                            stroke="#555555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{dealer?.website}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-lg mt-4">{dealer?.comments}</p>
                </div>

                <div className="flex flex-col gap-5">
                  <Button
                    onClick={() => showCommunicationModal(dealer)}
                    className="h-9 px-6 bg-transparent !text-[#185DDE] transition-colors duration-300 border !border-[#185DDE] font-medium rounded-full"
                  >
                    See Details
                  </Button>
                  <Button
                    onClick={() => onFinish(dealer?._id)}
                    className="h-9 px-6 bg-[#185DDE] hover:!bg-[#185DDE] transition-colors duration-300 border-none !text-white hover:!border-none font-medium rounded-full"
                  >
                    Make Dealer
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Space>
      <DealersAllComunicationModal
        isModalOpen={isShowCommunicationModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default Dealers;
