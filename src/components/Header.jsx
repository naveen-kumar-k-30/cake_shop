import { SquareMenu, HandHeart, Search, ShoppingBag } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useState } from "react";

const dummyData = [
  { title: "Anniversary gifts" },
  { title: "Gifts for him" },
  { title: "Gifts for her" },
  { title: "Wedding gifts" },
  { title: "Personalised gift ideas" },
  { title: "Housewarming gifts" },
  { title: "Friendship gifts" },
  { title: "Family gifts" },
  { title: "Professional gifts" },
  { title: "Long Distance gifts" },
];

function Header() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(dummyData);
  const [filterData, setFilterData] = useState(dummyData);
  const [searchdata, setSearchData] = useState("");

  const toggle = () => {
    setShow(!show);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = () => {
    const searchedText = data.filter(
      (e) => e.title.toString().toLowerCase() === searchdata
    );
    setFilterData(searchedText);
  };

  return (
    <header >
      <div className="2xl:container mx-auto bg-[#FFD0D0]">
        <div className="w-[90%] mx-auto grid grid-cols-2 lg:grid-cols-3 items-center py-4 border-b">
          <div className="flex items-center">
            <p className="text-3xl great-vibes font-bold text-[#DE8816]">
              The Milady&apos;s Pastries
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative col-span-2 lg:col-span-1 order-3 lg:order-2">
            <div className="bg-white border rounded-full p-1 flex items-center">
              <input
                type="text"
                placeholder="Search for anything"
                className="flex-grow px-4 py-2 text-gray-700 rounded-l-full focus:outline-none"
                onClick={toggle}
                onChange={(e) => {
                  const typedValue = e.target.value.toString().toLowerCase();
                  const filteredData = data.filter((e1) =>
                    e1.title.toString().toLowerCase().includes(typedValue)
                  );
                  setFilterData(filteredData);
                  setSearchData(typedValue);
                }}
              />
              <button
                onClick={handleSearch}
                className="bg-[#DE8816] hover:bg-yellow-500 rounded-full p-2 flex justify-center items-center"
              >
                <Search className="text-white" />
              </button>
            </div>
            <div className={show ? "block" : "hidden"}>
              <div className="absolute bg-white w-full mt-1 shadow-lg rounded-lg z-10">
                {filterData.length > 0 ? (
                  filterData.map((e, index) => (
                    <p
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200"
                      onClick={toggle}
                    >
                      {e.title}
                    </p>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu and Hamburger Icon */}
          <div className="order-2 lg:order-3 flex justify-end">
            {/* Hamburger Icon */}
            <button
              onClick={toggleMenu}
              className="lg:hidden  ml-5 focus:outline-none text-white "
            >
              <SquareMenu />
            </button>

            {/* Navigation Links */}
            <ul
              className={`${
                menuOpen ? "block" : "hidden"
              } lg:flex lg:space-x-4 space-y-4 lg:space-y-0 absolute lg:relative z-50 lg:flex-row flex flex-col lg:items-center bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg shadow-lg lg:shadow-none mt-8 lg:mt-0`}
            >
              <li>
                <Link to="/home">
                  <button className="flex items-center text-gray-700 ">
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/SignUp">
                  <button className="flex items-center text-gray-700">
                    SignUp
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className="flex items-center text-gray-700">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/About">
                  <button className="flex items-center text-gray-700">
                    About
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/review">
                  <button className="flex items-center text-gray-700">
                    Reviews
                  </button>
                </Link>
              </li>
              <li>
                <Link>
                  <HandHeart className="text-gray-700" />
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <ShoppingBag className="text-gray-700" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
