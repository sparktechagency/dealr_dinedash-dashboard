/* eslint-disable react/prop-types */
import { Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleMapsApiKey } from "../../../constant/baseUrl";

const libraries = ["places"];

export default function BusinessNameWithGoogleApi({ form, setIsVerfiying }) {
  const inputRef = useRef(null);
  const autoRef = useRef(null);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [err, setErr] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    // ✅ AntD Input -> real HTMLInputElement is here:
    const inputEl = inputRef.current?.input;

    if (!inputEl || !window.google?.maps?.places) return;

    autoRef.current = new window.google.maps.places.Autocomplete(inputEl, {
      types: ["establishment"],
      fields: ["place_id", "name", "formatted_address", "website"],
    });

    const listener = autoRef.current.addListener("place_changed", () => {
      const place = autoRef.current.getPlace();

      if (!place?.place_id) {
        setSelectedPlace(null);
        setIsVerfiying(false);
        setErr("Please pick a business from Google suggestions");
        return;
      } else {
        setIsVerfiying(true);
      }

      setSelectedPlace(place);

      setErr("");

      form.setFieldsValue({
        businessName: place.name || "",
        detialsAddress: place.formatted_address || "",
        website: place.website || "",
        placeId: place.place_id,
      });
    });

    return () => {
      // ✅ cleanup listener
      if (listener) listener.remove();
    };
  }, [isLoaded, form, setIsVerfiying]);

  if (!isLoaded) return <p>Loading Google...</p>;

  return (
    <>
      <Form.Item
        name="businessName"
        rules={[{ required: true, message: "Name is Required" }]}
        validateStatus={err ? "error" : undefined}
        help={err || undefined}
      >
        <Input
          ref={inputRef}
          placeholder="Type & select from Google suggestions"
          onChange={() => {
            setSelectedPlace(null);
            setErr("");
          }}
          onBlur={() => {
            const val = form.getFieldValue("businessName");
            if (val && !selectedPlace?.place_id) {
              setSelectedPlace(null);
              setIsVerfiying(false);
              setErr("Please pick a business from Google suggestions");
            }
          }}
          className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] hover:border-[#185DDE] focus:border-[#0C0C0C] focus:outline-none "
        />
      </Form.Item>

      <Form.Item name="placeId" hidden>
        <Input className="px-4 py-2 rounded bg-transparent border-[#0C0C0C] ..." />
      </Form.Item>

      {selectedPlace?.place_id && (
        <p style={{ color: "green", marginTop: -16, marginBottom: 8 }}>
          Verified ✅ {selectedPlace.name}
        </p>
      )}
    </>
  );
}
