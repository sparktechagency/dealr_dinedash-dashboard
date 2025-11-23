import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStaticContentMutation } from "../../../Redux/api/settings/settingsApi";
import { toast } from "sonner";
import Spinner from "../../Shared/Spinner";

const TermsOfService = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [createStaticContent, { isLoading }] = useCreateStaticContentMutation();

  const handleOnSave = async () => {
    const toastId = toast.loading("Loading...");
    const data = {
      type: "terms-of-service",
      content: content,
    };

    try {
      const res = await createStaticContent(data).unwrap();
      setContent("");
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen py-1">
      <div className="p-2 rounded">
        {" "}
        <div className="flex items-center gap-3">
          <LeftOutlined
            className="text-lg cursor-pointer"
            onClick={handleGoBack}
          />
          <h1 className="text-3xl font-medium py-4">Terms Of Service</h1>
        </div>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            className="!border-2 !border-[#185DDE] !rounded-xl"
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          className="w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium mt-8"
        >
          {isLoading ? <Spinner /> : "Save"}
        </Button>
      </div>
    </div>
  );
};
export default TermsOfService;
