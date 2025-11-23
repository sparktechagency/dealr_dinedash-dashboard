import { LeftOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, DatePicker, Form, Input, Upload } from "antd";
import Typography from "antd/es/typography/Typography";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../../Components/Shared/Spinner";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../../Redux/api/user/userApi";
import { baseUrl } from "../../constant/baseUrl";

const EditProfile = () => {
  const navigate = useNavigate();
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();
  const { data: myProfile } = useGetMyProfileQuery();
  const profileData = myProfile?.data?.attributes?.[0];

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: profileData?.fullName,
      email: profileData?.email,
      formatted_phone_number: profileData?.formatted_phone_number,
      dob: profileData?.dob ? dayjs(profileData.dob) : null,
      image: profileData?.image,
    });
  }, [form, profileData]);

  const [imageUrl, setImageUrl] = useState(`${baseUrl}/${profileData?.image}`);

  useEffect(() => {
    setImageUrl(`${baseUrl}/${profileData?.image}`);
  }, [profileData?.image]);

  const onFinish = async (values) => {
    const formData = new FormData();
    const toastId = toast.loading("Loading...");

    console.log(values?.image?.file?.originFileObj);

    const data = {
      profileImage: values?.image?.file?.originFileObj,
    };

    // Append other fields
    if (data.profileImage) {
      formData.append("image", data.profileImage);
    }

    const updatedData = {
      fullName: values.name,
      formatted_phone_number: values.formatted_phone_number,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
    };

    formData.append("data", JSON.stringify(updatedData));

    try {
      const res = await updateProfile(formData).unwrap();
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      if (res?.statusCode === 200) {
        form.resetFields();
      }
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during Login",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(`${baseUrl}${profileData?.image}`);
    } else {
      const file = info.file.originFileObj || info.file;
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  return (
    <div className="py-4 lg:py-8 min-h-screen ">
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
      </div>

      <div className="bg-[#B7CDF5] rounded-lg shadow-lg p-6 px-20 w-full mx-auto border-2 border-[#185DDE]">
        <ConfigProvider>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="relative w-fit">
              <img
                src={imageUrl}
                // src={imageUrl}
                alt=""
                className="w-40 h-40 rounded-full object-cover object-top border border-secondary-color"
              />
              <Form.Item name="image" className="mb-8 ">
                <Upload
                  maxCount={1}
                  listType="text"
                  customRequest={(options) => {
                    setTimeout(() => {
                      options.onSuccess("ok");
                    }, 1000);
                  }}
                  accept="image/*"
                  multiple={false}
                  onChange={handleImageUpload}
                  className="absolute -top-7  text-end"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <div className="w-fit p-2 border-2 border-white absolute left-28 top-0 bg-secondary-color rounded-full">
                    <AiOutlineEdit className="text-primary-color " />
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <Form.Item label="Full Name" name="name">
              <Input className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                readOnly
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
              />
            </Form.Item>
            <Typography label={5} className="mb-1">
              Phone Number
            </Typography>
            <div className="flex gap-2 mb-4">
              <Form.Item name="formatted_phone_number" noStyle>
                <Input className="px-4 h-12 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none" />
              </Form.Item>
            </div>

            <Form.Item label="Date of Birth" name="dob">
              <DatePicker
                format="YYYY-MM-DD"
                className="px-4 h-12 rounded-xl border-gray-300"
              />
            </Form.Item>

            <Button
              className="w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
              type="primary"
              block
              htmlType="submit"
              disabled={updateProfileLoading}
            >
              {updateProfileLoading ? (
                <Spinner size="small" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default EditProfile;
