import { useState } from "react";
import ReuseSelect from "../Form/ReusableSelect";
import TagItem from "./TagItem";
import RButton from "../../../ui/RButton";
import NotificationModal from "./NotificationModal";
import { useTranslation } from "react-i18next";

const CustomerTopBar = () => {
  const [regions, setRegions] = useState([]);
  const [postcodes, setPostcodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  // Generic Add
  const addItem = (setter) => (value) => {
    setter((prev) => [...prev, value]);
  };

  // Generic Remove (by comparing value)
  const removeItem = (setter) => (target) => {
    setter((prev) => prev.filter((item) => item !== target));
  };

  // Usage
  const addRegion = addItem(setRegions);
  const addPostcode = addItem(setPostcodes);

  const removeRegion = removeItem(setRegions);
  const removePostcode = removeItem(setPostcodes);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between my-10 px-6">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <ReuseSelect
            placeholder={t("customers.selectRegion")}
            selectClassName="!w-[200px] !bg-transparent"
            onChange={addRegion}
            options={[
              { value: "north", label: "North" },
              { value: "south", label: "South" },
              { value: "east", label: "East" },
              { value: "west", label: "West" },
            ]}
            value={regions}
          />

          <ReuseSelect
            placeholder={t("customers.selectPostCode")}
            selectClassName="!w-[200px] !bg-transparent"
            onChange={addPostcode}
            options={[
              { value: "52456", label: "52456" },
              { value: "34548", label: "34548" },
              { value: "1000", label: "1000" },
              { value: "1100", label: "1100" },
            ]}
            value={postcodes}
          />
        </div>

        {/* Selected tags display */}
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center justify-center gap-2">
            {regions?.map((region) => (
              <TagItem
                key={region}
                label={region}
                onRemove={() => removeRegion(region)}
              />
            ))}
          </div>

          <div className="w-fit space-y-2">
            <div className="flex items-center justify-center gap-2">
              {postcodes?.map((postcode) => (
                <TagItem
                  key={postcode}
                  label={postcode}
                  onRemove={() => removePostcode(postcode)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <RButton
        className="text-lg !font-normal !w-[450px] capitalize"
        loadingMessage={t("customers.sendNotification")}
        type="button"
        onClick={() => setIsModalOpen(true)}
      />
      <NotificationModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default CustomerTopBar;
