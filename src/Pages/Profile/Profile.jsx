import {
  CalendarOutlined,
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import Spinner from "../../Components/Shared/Spinner";
import { useGetMyProfileQuery } from "../../Redux/api/user/userApi";
import { baseUrl } from "../../constant/baseUrl";

const Profile = () => {
  const serverUrl = baseUrl;
  const { data: myProfile, isFetching } = useGetMyProfileQuery({});
  const myProfileData = myProfile?.data?.attributes?.[0];
  const navigate = useNavigate();

  console.log(myProfileData, "myProfileData");

  const handleEditClick = () => {
    navigate("/admin/edit-profile", { state: { myProfileData } });
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="py-4 lg:py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">
            Profile Information
          </h2>
        </div>
        <Button
          icon={<EditOutlined />}
          onClick={handleEditClick}
          className=" h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium px-8"
        >
          Edit Profile
        </Button>
      </div>
      <div className="bg-[#B7CDF5] rounded-lg shadow-lg p-6 border-2 border-[#185DDE]">
        <div className="flex items-center gap-20 mx-48">
          <div className="flex flex-col items-center">
            <img
              // src={`${baseUrl}/${myProfileData?.image}` || AllImages.userImage}
              src={
                myProfileData?.image
                  ? serverUrl + myProfileData?.image
                  : AllImages.profile
              }
              className="size-48 rounded-full object-cover"
              alt="user"
            />

            <h3 className="xl:text-2xl font-bold mt-2">Admin</h3>
            <h2 className="text-xl lg:text-3xl font-medium">
              {myProfileData?.fullName || "N/A"}
            </h2>
          </div>
          <div className="flex-1">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorTextPlaceholder: "rgba(255,255,255,0.7)",
                    hoverBg: "#B7CDF5",
                    activeBg: "#B7CDF5",
                  },
                },
              }}
            >
              <Form layout="vertical">
                <Form.Item
                  label={
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      First Name
                    </label>
                  }
                >
                  <Input
                    className="px-4 py-3 bg-[#B7CDF5]  h-11 font-semibold rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                    value={myProfileData?.fullName || "N/A"}
                    readOnly
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Email
                    </label>
                  }
                >
                  <Input
                    className="px-4 py-3 bg-[#B7CDF5]  h-11 font-semibold rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                    value={myProfileData?.email || "N/A"}
                    readOnly
                  />
                </Form.Item>
                <div className="flex flex-col">
                  <Form.Item
                    label={
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        Phone Number
                      </label>
                    }
                  >
                    <div className="flex gap-2">
                      <Input
                        className="px-4 py-3 bg-[#B7CDF5]  h-11 font-semibold rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                        value={myProfileData?.formatted_phone_number || ""}
                        readOnly
                      />
                    </div>
                  </Form.Item>
                </div>
                <Form.Item
                  label={
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Date of Birth
                    </label>
                  }
                >
                  <Input
                    className="px-4 py-3 bg-[#B7CDF5]  h-11 font-semibold rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                    value={moment(myProfileData?.dob).format("LL")}
                    prefix={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CalendarOutlined />
                        <span style={{ marginLeft: "8px" }}></span>
                      </div>
                    }
                    readOnly
                  />
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
