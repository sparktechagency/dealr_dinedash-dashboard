/* eslint-disable no-unused-vars */
import { Button, Image, Pagination } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useRecipeRequestQuery,
  useVerifyAndRecipeRequestMutation,
} from "../../../Redux/api/driver/recipe";
import Spinner from "../../Shared/Spinner";
import PageWrapper from "../../UI/PageWrapper";
import { AllImages } from "../../../../public/images/AllImages";

const DealerRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const navigate = useNavigate();

  const { data, isLoading } = useRecipeRequestQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);
  const recipeRequest = data?.data?.result;

  const [verifyAndRecipeRequest] = useVerifyAndRecipeRequestMutation();

  // Accept request by updating its accepted status
  const handleAccept = async (id) => {
    const toastId = toast.loading("Loading in...");

    const data = {
      isAccepted: true,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      await verifyAndRecipeRequest({ id, data }).unwrap();
      toast.success("Recipe Request Accepted", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      // Log the error for debugging
      toast.error(error?.data?.message || error?.error || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleTitleClick = (request) => {
    navigate(`/dealer-request/${request}`, { state: request });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PageWrapper pageTitle="Recipe Request">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-6 ">
        {Array.from({ length: 50 })?.map((item, index) => (
          <div
            key={index}
            className="rounded-[20px] flex flex-col justify-between"
            style={{ minHeight: "130px" }} // to keep cards uniform height
          >
            <div className="flex items-center justify-between gap-x-2">
              <Image
                src={AllImages.userImage}
                preview={false}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <div className="flex-1">
                <div

                onClick={() => handleTitleClick(index)}
                >
                  <h3 className="font-semibold text-xl mb-1 cursor-pointer">
                    Dianne Russell
                  </h3>
                  <p className="mb-4">Dianne Russell</p>
                </div>
                <div className="flex justify-between items-center space-x-4">
                  <Button
                    // onClick={() => handleAccept(item?._id)}
                    className="w-full h-11 rounded-tl-xl rounded-br-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
                  >
                    Accept
                  </Button>
                  <Button className="w-full h-11 rounded-tl-xl rounded-br-xl hover:!bg-[#185DDE] transition-colors hover:!text-white duration-300 !text-[#185DDE] hover:!border-none font-medium border !border-[#185DDE]">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 sticky bottom-0 flex items-center bg-white justify-end">
        <Pagination
          onChange={(value) => setCurrentPage(value)}
          pageSize={data?.data?.meta?.limit}
          total={data?.data?.meta?.total}
        />
      </div>
    </PageWrapper>
  );
};

export default DealerRequest;
