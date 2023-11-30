import { getStaticProps } from "@/app/actions/getListings";
import ListingPage from "./ListingsPage";

const Listings = async () => {
  const listings = await getStaticProps();
  console.log(listings);

  return (
    <div
      className="grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      gap-8"
    >
      {listings.map((el) => {
        return <ListingPage key={el.id} {...el} />;
      })}
    </div>
  );
};

export default Listings;
