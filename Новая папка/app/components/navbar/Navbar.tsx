import Container from "../Container";

import Search from "./Search";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: any;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="border-b-[1px] z-10 shadow-sm">
      <div className="w-full bg-white ">
        <div
          className="
                        py-4 
                        
                    "
        >
          <Container>
            <div
              className="
                            flex 
                            flex-row 
                            items-center 
                            justify-between
                            gap-3
                            md:gap-0
                        "
            >
              <Logo />
              <Search />
              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
