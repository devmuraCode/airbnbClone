import React, { FC, useState } from "react";
import Select from "react-select";
import countries from "world-countries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface TProps {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CounterSelect: FC<TProps> = (props) => {
  const { value, onChange } = props;
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

  const formatOptionLabel = (option: { label: string; region: string }) => (
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
        required
        className="basic-single"
        classNamePrefix="select"
        defaultValue={countryOptions}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="countries"
        options={countryOptions}
        formatOptionLabel={formatOptionLabel}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
      />
    </>
  );
};

export default CounterSelect;
