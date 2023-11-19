import React, { useState } from "react";
import Select from "react-select";
import countries from "world-countries";
import Map from "../modals/rent/map/Map";

const CounterSelect = () => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);


  
  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    region: country.region,
    flag: country.flag,
    latlng: country.latlng,
  }));

  
  

  const formatOptionLabel = (option: {
    label: string;
    region: string;
  }) => (
    <div className="flex flex-row items-center gap-3">
      <div>
        {option.label},
        <span className="text-neutral-500 ml-1">{option.region}</span>
      </div>
    </div>
  );

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={countryOptions[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="countries"
        options={countryOptions}
        formatOptionLabel={formatOptionLabel}
      />
    </>
  );
};

export default CounterSelect;