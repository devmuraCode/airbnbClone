import ClientOnly from "./ClientOnly";
import Container from "./components/Container";
import Listings from "./components/listings/Listings";


export default function Home() {

  return (
    <ClientOnly>
      <Container>
          <Listings />
      </Container>
    </ClientOnly>
  );
}
