import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Typography } from "antd";
import Spinner from "../../Shared/Spinner";
import PageWrapper from "../../UI/PageWrapper";
import {
  useAcceptDealerRequestMutation,
  useDeclineDealerRequestMutation,
  useGetSpacificUserQuery,
} from "../../../Redux/api/user/userApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { baseUrl } from "../../../constant/baseUrl";

const { Title, Text } = Typography;

const RecipeRequestDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isFetching } = useGetSpacificUserQuery(id, {
    skip: !id,
  });
  const userData = data?.data?.attributes?.[0];

  const [acceptReq] = useAcceptDealerRequestMutation();
  const [declineReq] = useDeclineDealerRequestMutation();

  // Accept request by updating its accepted status
  const handleAccept = async (id) => {
    const res = await tryCatchWrapper(
      acceptReq,
      {
        params: id,
      },
      "Accepting..."
    );
    if (res.statusCode === 200) {
      navigate("/admin/dealer-request");
    }
  };
  const handleDecline = async (id) => {
    const res = await tryCatchWrapper(
      declineReq,
      {
        params: id,
      },
      "Accepting..."
    );
    if (res.statusCode === 200) {
      navigate("/admin/dealer-request");
    }
  };

  if (isFetching) {
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
            src={baseUrl + userData?.image}
            preview={false}
            width={100}
            height={100}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
          <div className="flex-1">
            <div>
              <h3 className="font-semibold text-xl mb-1 cursor-pointer">
                {userData?.FullName}
              </h3>
              <p className="mb-4">{userData?.email}</p>
            </div>
            <div className="flex justify-between items-center space-x-4">
              <Button
                onClick={() => handleAccept(userData?._id)}
                className="w-full h-11 rounded-tl-xl rounded-br-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleDecline(userData?._id)}
                className="w-full h-11 rounded-tl-xl rounded-br-xl hover:!bg-[#185DDE] transition-colors hover:!text-white duration-300 !text-[#185DDE] hover:!border-none font-medium border !border-[#185DDE]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10">
        <div className="space-y-1 mt-4">
          <Title level={3}>Dealer Information</Title>

          <div className="flex gap-x-6">
            <Text>Name:</Text>
            <Text>{userData?.fullName}</Text>
          </div>
          <div className="flex gap-x-6">
            <Text>Email:</Text>
            <Text>{userData?.email}</Text>
          </div>

          <div className="flex gap-x-6">
            <Text>Business:</Text>
            {userData?.businessNames?.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </div>

          <div className="flex gap-x-6">
            <Text>Postcode:</Text>
            <Text>{userData?.postalCode}</Text>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RecipeRequestDetails;
