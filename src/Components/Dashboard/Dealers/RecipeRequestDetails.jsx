import { Button } from "antd";
import { useParams } from "react-router-dom";

import { Image, Typography } from "antd";
import { toast } from "sonner";
import { AllImages } from "../../../../public/images/AllImages";
import {
  useGetRecipeByIdQuery,
  useVerifyAndRecipeRequestMutation,
} from "../../../Redux/api/driver/recipe";
import Spinner from "../../Shared/Spinner";
import PageWrapper from "../../UI/PageWrapper";

const { Title, Text } = Typography;

const RecipeRequestDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetRecipeByIdQuery(id);
  const recipe = data?.data;

  const [verifyAndRecipeRequest] = useVerifyAndRecipeRequestMutation();

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

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <PageWrapper pageTitle="Dealer Request Details " className="!h-screen">
      <div
        // key={index}
        className="rounded-[20px] flex flex-col justify-between w-fit py-6"
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
            // onClick={() => handleTitleClick(index)}
            >
              <h3 className="font-semibold text-xl mb-1 cursor-pointer">
                Dianne Russell
              </h3>
              <p className="mb-4">Dianne Russell</p>
            </div>
            <div className="flex justify-between items-center space-x-4">
              <Button
                // onClick={() => handleAccept(item?._id)}
                className="w-[200px] h-11 rounded-tl-xl rounded-br-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
              >
                Accept
              </Button>
              <Button className="w-[200px] h-11 rounded-tl-xl rounded-br-xl hover:!bg-[#185DDE] transition-colors hover:!text-white duration-300 !text-[#185DDE] hover:!border-none font-medium border !border-[#185DDE]">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10">
        <div className="space-y-1 mt-4">
          <Title level={3}>Dealer Information</Title>

          <div className="flex gap-x-1">
            <Text>Serial No:</Text>
            <Text>06</Text>
          </div>

          <div className="flex gap-x-1">
            <Text>Name:</Text>
            <Text>John Doe</Text>
          </div>
          <div className="flex gap-x-1">
            <Text>Email:</Text>
            <Text>johndoe@co.com</Text>
          </div>

          <div className="flex gap-x-1">
            <Text>Postcode:</Text>
            <Text>75462</Text>
          </div>
          <div className="flex gap-x-1">
            <Text>Location:</Text>
            <Text>Bansree, Dhaka</Text>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RecipeRequestDetails;
