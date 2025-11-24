import { useState, useMemo } from "react";
import ReuseSelect from "../Form/ReusableSelect";
import TagItem from "./TagItem";
import RButton from "../../../ui/RButton";
import NotificationModal from "./NotificationModal";
import { useTranslation } from "react-i18next";
import { useGetCityQuery } from "../../../Redux/api/city/cityApi";

const CustomerTopBar = () => {
  const { data } = useGetCityQuery({ page: 1, limit: 100000 });

  const allCities = useMemo(
    () => data?.data?.attributes?.results || [],
    [data]
  );

  const [selectedCity, setSelectedCity] = useState(null); // store selected city object
  const [regions, setRegions] = useState([]); // city tags
  const [postcodes, setPostcodes] = useState([]); // postal code tags
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  // Generic Add (prevent duplicates)
  const addItem = (setter) => (value) => {
    setter((prev) => {
      if (!prev.includes(value)) {
        return [...prev, value];
      }
      return prev; // do nothing if already exists
    });
  };

  // Generic Remove
  const removeItem = (setter) => (target) => {
    setter((prev) => prev.filter((item) => item !== target));
  };

  // Add city
  const addRegion = (cityName) => {
    const cityObj = allCities.find((c) => c.cityName === cityName);
    if (cityObj) {
      setSelectedCity(cityObj); // set selected city for postal codes dropdown
      addItem(setRegions)(cityName); // add city tag (no duplicates)
    }
  };

  // Add postal code
  const addPostcode = addItem(setPostcodes);

  // Remove city
  const removeRegion = (region) => {
    removeItem(setRegions)(region);
    if (selectedCity?.cityName === region) {
      setSelectedCity(null); // clear selected city if tag removed
      setPostcodes([]); // clear postal codes
    }
  };

  // Remove postal code
  const removePostcode = removeItem(setPostcodes);

  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-between my-10 px-6">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          {/* City Select */}
          <ReuseSelect
            placeholder={t("customers.selectRegion")}
            selectClassName="!w-[200px] !bg-transparent"
            onChange={addRegion}
            options={allCities.map((city) => ({
              value: city.cityName,
              label: city.cityName,
            }))}
            value={regions}
          />

          {/* Postal Code Select */}
          <ReuseSelect
            placeholder={t("customers.selectPostCode")}
            selectClassName="!w-[200px] !bg-transparent"
            onChange={addPostcode}
            options={
              selectedCity
                ? selectedCity.postalCode.map((code) => ({
                    value: code,
                    label: code,
                  }))
                : []
            }
            value={postcodes}
          />
        </div>

        {/* Selected tags display */}
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center justify-center gap-2">
            {regions.map((region) => (
              <TagItem
                key={region}
                label={region}
                onRemove={() => removeRegion(region)}
              />
            ))}
          </div>

          <div className="w-fit space-y-2">
            <div className="flex items-center justify-center gap-2">
              {postcodes.map((postcode) => (
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
