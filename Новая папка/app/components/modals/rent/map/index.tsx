import dynamic from "next/dynamic";

const Map = dynamic(() => import('./Map'))

export default Map;