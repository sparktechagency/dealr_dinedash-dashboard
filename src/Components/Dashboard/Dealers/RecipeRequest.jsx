/* eslint-disable no-unused-vars */
import { Button, Image, Pagination } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Shared/Spinner";
import PageWrapper from "../../UI/PageWrapper";
import {
  useAcceptDealerRequestMutation,
  useAllDealerRequestQuery,
  useDeclineDealerRequestMutation,
} from "../../../Redux/api/user/userApi";
import { baseUrl } from "../../../constant/baseUrl";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useTranslation } from "react-i18next";

const DealerRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [acceptReq] = useAcceptDealerRequestMutation();
  const [declineReq] = useDeclineDealerRequestMutation();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data, isFetching } = useAllDealerRequestQuery({
    page: currentPage,
    limit: pageSize,
  });
  const allReq = data?.data?.attributes?.users || [];
  const totalReq = data?.data?.attributes?.pagination?.totalResults || 0;

  // Accept request by updating its accepted status
  const handleAccept = async (id) => {
    await tryCatchWrapper(
      acceptReq,
      {
        params: id,
      },
      "Accepting..."
    );
  };
  const handleDecline = async (id) => {
    await tryCatchWrapper(
      declineReq,
      {
        params: id,
      },
      "Accepting..."
    );
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleTitleClick = (request) => {
    navigate(`/admin/dealer-request/${request}`, { state: request });
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <PageWrapper pageTitle={t("dealerRequest.dealerRequests")} isSearch={false}>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-6 ">
        {allReq?.map((item, index) => (
          <div
            key={index}
            className="rounded-[20px] flex flex-col justify-between"
            style={{ minHeight: "130px" }} // to keep cards uniform height
          >
            <div className="flex items-center justify-between gap-x-2">
              <Image
                src={baseUrl + item?.image}
                preview={false}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <div className="flex-1">
                <div
                  className="cursor-pointer"
                  onClick={() => handleTitleClick(item?._id)}
                >
                  <h3 className="font-semibold text-xl mb-1 cursor-pointer">
                    {item?.fullName}
                  </h3>
                  <p className="mb-4">{item?.email}</p>
                </div>
                <div className="flex justify-between items-center space-x-4">
                  <Button
                    onClick={() => handleAccept(item?._id)}
                    className="w-full h-11 rounded-tl-xl rounded-br-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
                  >
                    {t("dealerRequest.dealerAccept")}
                  </Button>
                  <Button
                    onClick={() => handleDecline(item?._id)}
                    className="w-full h-11 rounded-tl-xl rounded-br-xl hover:!bg-[#185DDE] transition-colors hover:!text-white duration-300 !text-[#185DDE] hover:!border-none font-medium border !border-[#185DDE]"
                  >
                    {t("dealerRequest.dealerDelete")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 sticky bottom-0 flex items-center bg-white justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          total={totalReq}
        />
      </div>
    </PageWrapper>
  );
};

export default DealerRequest;
