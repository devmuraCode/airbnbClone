import React from "react";
import CounterSelect from "../../../inputs/CounterSelect";
import Map from "../map/Map";

const LocationBox = () => {

  
  return (
    <div>
      <CounterSelect />
      <div className="pt-5">
        <Map />
      </div>
    </div>
  );
};

export default LocationBox;
